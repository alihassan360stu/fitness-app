# Fitness Tracker App (Expo) - JavaScript (No TypeScript)

Simple fitness tracker app with 3 main screens:
- Home: list of exercises, mark complete
- Detail: exercise image and description
- Add Exercise: create custom exercise

Optional features implemented:
- Mark exercise as completed (togglable)
- Persistence via AsyncStorage (saved locally)

## How to run (local)

1. Install Expo CLI (if you don't have it): `npm install -g expo-cli`
2. Extract the project and run:
```
cd fitness-tracker-expo
npm install
npx expo start
```

App uses these notable dependencies (already in package.json):
- expo, react, react-native
- @react-navigation/native & @react-navigation/native-stack
- @react-native-async-storage/async-storage

## Git & Submission
- Create a new private GitHub repo, push all files, then zip the folder and upload to Google Classroom.
- Example Git commands:
```
git init
git add .
git commit -m "Initial commit - Fitness Tracker Expo"
git remote add origin <your-private-github-repo-url>
git branch -M main
git push -u origin main
```

Make sure your GitHub repo is private and add its link as a private message in Google Classroom submission, and upload the zip file to Google Classroom as well.
