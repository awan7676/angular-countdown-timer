# Angular Countdown Timer


## Installation

1. **Install dependencies**
   
   ```bash
   npm install
   ```

## Running the Application

You need to run **two servers** simultaneously: the Angular dev server and the mock API server.

### Step 1: Start the Mock API Server

Open a terminal and run:
```bash
node mock-server.js
```

You should see:
```
Mock API running on http://localhost:3000
Endpoint: http://localhost:3000/api/deadline
```

**Note:** The mock server returns `{ secondsLeft: value }` for demonstration purposes. You can modify the value in `mock-server.js` to test with different countdown durations.

### Step 2: Start the Angular Application

Open a **new terminal** (keep the mock server running) and run:
```bash
ng serve --proxy-config proxy.conf.json
```

You should see output ending with:
```
** Angular Live Development Server is listening on localhost:4200 **
```

### Step 3: Open in Browser

Navigate to: [http://localhost:4200](http://localhost:4200)

You should see the countdown timer displaying and updating every second.
