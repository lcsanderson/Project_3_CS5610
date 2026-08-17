# Code Review for CS5610 by Barbara Louyakis

**Repo reviewed:** `Project_3_CS5610-main` (LCS004)

---

## General thoughts

This is a very useful site for people interested in browsing this kind of artwork. Initially I was confused about what the application was for. I was not greeted with the typical 'About' page or a login screen, and there is no text informing me of the purpose. I was not able to click on the cards for a larger view or more details, so I tried the search bar and found relevant items to look at. I could not see the star in the top right corner but once I tried to click the star on an item, it directed me to login. I created an account which was easy, then I was able to add items to my collection. I deleted my collection and there was no pop-up confirmation, so I thought that might be helpful to prevent people from accidentally deleting a collection they spent a lot of time building. The visual feel is sleek and appealing. The only issue I had was not being able to see the star in the top right corner - or knowing what that star did, until I figured it out. I think people 'in the industry' would really love the sleek and slightly mysterious design of this site. 

The slides were informative and the video presentation was helpful - however if the screenshare was full screen it would have been easier to see. The color scheme and typography made the site feel exclusive and mysterious. 

---

## Rubric findings

### Code formatted with Prettier

`npx prettier --check .` flags **14 files** - run `npx prettier --write .` from the root.

### ESLint config exists and throws no errors 

Both configs exist, and each passes when run from its own directory. However, running `npx eslint .` from the repo root crashes:

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'eslint-plugin-react-hooks'
imported from FRONTEND/eslint.config.js
```

The root run picks up `FRONTEND/eslint.config.js`, whose plugins aren't installed at the root. If you lint from the root, it errors. Also note: the frontend config doesn't include the Prettier plugin, which is why the formatting issues above slip through lint.

### PropTypes for every component 

`StarIcon.jsx` defines `StarIcon.PropTypes` with a **capital P**. React only reads lowercase `propTypes`, so this silently does nothing.

### No leftover / unused code 

- `test-fetch.js` at the root 
- Two committed `cookies.txt` 
- `FRONTEND/README.md` 
- `index.html` links `./src/index.css`, which doesn't exist (real file is `src/css/index.css`) - the Vite build gives a warning
- `index.html` references `/favicon.svg`, but `public/` contains only the sound file
- Commented-out jest import in `eslint.config.js`

### package.json lists all dependencies 

`FRONTEND/package.json` doesn't declare `prop-types`, which four components import. It's only in the *backend* package.json 

Backend `package.json` says `"license": "ISC"` but the LICENSE file and README say MIT.

### README 

- The "Project Objective" is the intro paragraph, which describes **Project 3** ("super ugly on purpose... Project 4 is intended to be an iteration")
- Typo in the build instructions: `cd FRONTNED`
