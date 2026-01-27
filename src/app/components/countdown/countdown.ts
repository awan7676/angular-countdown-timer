import { Component, OnInit, ChangeDetectionStrategy, DestroyRef, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { interval, tap, catchError, throwError, filter, takeUntil } from 'rxjs';
import { DeadlineService } from '../../services/deadline';

@Component({
  selector: 'app-countdown',
  imports: [CommonModule],
  templateUrl: './countdown.html',
  styleUrls: ['./countdown.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountdownComponent implements OnInit {
  secondsLeft = signal<number | null>(null);
  isLoading = signal(true);
  error = signal<string | null>(null);
  
  formattedTime = computed(() => {
    const seconds = this.secondsLeft();
    return seconds ? this.formatTime(seconds) : '';
  });

  private secondsLeftObsv = toObservable(this.secondsLeft);
  private destroyRef = inject(DestroyRef);
  private deadlineService = inject(DeadlineService);

  ngOnInit(): void {
    this.initializeCountdown();
  }

  initializeCountdown(): void {
    this.deadlineService.getDeadline().pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(response => {
        this.secondsLeft.set(response.secondsLeft);
        this.isLoading.set(false);
        this.startCountdown();
      }),
      catchError(error => {
        this.error.set(error.message);
        this.isLoading.set(false);
        return throwError(() => error);
      })
    ).subscribe();
  }

  private startCountdown(): void {
    interval(1000).pipe(
      takeUntilDestroyed(this.destroyRef),
      takeUntil(
        this.secondsLeftObsv.pipe(
          filter(s => s !== null && s <= 0),
        )
      ),
      tap(() => {
        const current = this.secondsLeft();
        if (current) {
          this.secondsLeft.set(current - 1);
        }
      })
    ).subscribe();
  }

  private formatTime(seconds: number): string {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const parts: string[] = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    parts.push(`${secs}s`);

    return parts.join(' ');
  }
}