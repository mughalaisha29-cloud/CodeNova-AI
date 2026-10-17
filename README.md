# Learnova AI — Login & Student Website

A Next.js + TypeScript student website with an AI/programming-themed login page, light/dark theme switch, login and registration demo flow, and a sample student workspace.

## Run on Windows using VS Code

1. Extract this ZIP into a **new folder**.
2. In VS Code, choose **File → Open Folder** and select the extracted folder that directly contains `package.json` and the `app` folder.
3. Choose **Terminal → New Terminal**.
4. Run `dir`. Confirm `package.json` appears in the list.
5. Run these commands one at a time:

   ```powershell
   npm.cmd install
   npm.cmd run dev
   ```

6. Keep the terminal open. Open Google Chrome at **http://localhost:3000**.

If `npm` reports `ENOENT` for `package.json`, the terminal is in the wrong folder. In VS Code use **File → Open Folder** and select the folder that directly contains `package.json` and `app`.

A Roman Urdu step-by-step guide is included as `RUN-GUIDE-URDU.txt`.

## Test the login page

1. Click **Sign up**.
2. Enter demo/test details and create an account.
3. Confirm the registration success message.
4. Log in using the same test email and password. Wrong details should show an error.
5. Switch between light and dark themes.

## Important limitations

- This is a local front-end demo. Do not use real or reused passwords. It is not production-secure authentication.
- **Continue with Google is not connected yet**. Real Google sign-in requires OAuth configuration and a secure authentication backend.
- Password reset, server-side sessions, database storage, and production-grade authentication need backend integration.
- The hero visual loads from an external image URL, so internet access is needed for that image.
