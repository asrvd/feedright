## Ponsor
getting feedback made easier using widgets

### Tech Stack
A lot of different tech and soft wares were used to create Ponsor, here is a list of the tech I used - 
- [Next.js](https://nextjs.org) - Framework
- [Appwrite](https://appwrite.io) - Database
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [VS Code](https://code.visualstudio.com/) - Code Editor
- [Next Auth](https://next-auth.js.org/) - Auth
- [GitHub](https://github.com) - Code Base
- [Vercel](https://vercel.app) - Host
- [React Hot Toast](https://react-hot-toast.com/) - Toast Notifications

### Run Locally
- Clone the repository
```bash
git clone https://github.com/asrvd/feedright.git
```
- Install dependencies
```bash
cd feedright
pnpm i # or npm i
```
- Create a `.env` file and put these env variables in it
```env
# GitHub auth env variables
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Next Auth env variables
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Appwrite env variables
NEXT_PUBLIC_DATABASE_ID=
NEXT_PUBLIC_PROJECT_ID=
NEXT_PUBLIC_WIDGET_COLLECTION_ID=
NEXT_PUBLIC_FEEDBACK_COLLECTION_ID=
NEXT_PUBLIC_BUCKET_ID=
```
- Run the app
```bash
pnpm run dev # or npm run dev
```

### License 
[MIT License](LICENSE)

### Contributing
- Fork the repository
- Create a new branch
- Make your changes
- Commit your changes
- Push your changes to the main branch
- Open a pull request

### Ending Note
- This project was made for the [hashnode](https://hashnode.com) x [appwrite](https://appwrite.io) hackathon.
- If you have any questions, suggestions or bug reports please open an issue.
- Leave a star if you like the project.
- If you like this project, please consider [supporting](https://www.buymeacoffee.com/asheeshh) me.
