# Death at the Velvet Hour ✦

A 5–7 minute, **Murdle-inspired** murder mystery made for Tania. Designed in warm beige and brown, with original characters, a fully solvable logic puzzle, a private investigator's notebook, and a little romantic ending.

## Play / deploy

**No installation, build tools, databases, accounts, or API keys required.** The game works as a static website.

### Host on GitHub Pages

1. Create a new GitHub repository (e.g. `tanias-mystery`).
2. Upload **`index.html`, `style.css`, `game.js`, and the `assets` folder** to the root of the repository. (Or upload the files by pushing the repository with Git.)
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose the **`main`** branch, folder **`/ (root)`**, then **Save**.
6. Open the Pages URL GitHub provides (usually `https://YOUR-USERNAME.github.io/tanias-mystery/`).

You can also double-click `index.html` to play locally, or open the folder in VS Code with Live Server.

## How to play

- Read the briefing and learn the four suspects, four objects and four rooms.
- Open the evidence files. The second chapter unlocks after all four first-chapter files have been reviewed; the final chapter unlocks after the next four.
- Use the **notebook** to type notes and tap the two logic grids. Tap a grid square to cycle **unknown → excluded (✕) → confirmed (✓) → unknown**.
- You can pin clues directly to the notebook, and reveal up to three optional hints.
- After examining all ten exhibits, open **The verdict** and select the murderer, object and room.
- When you solve the case, the exact message **“Tania’s the prettiest ♥️”** appears.

Progress (including the clock, notes and grids) is automatically saved locally in the current browser via `localStorage`. The restart button lets you play again. The design adapts to phones and tablets; on smaller screens, use the bottom navigation to switch between Case file, Notebook and Verdict.

## Customize

- **Mystery texts, suspects in the logic grid, hints and correct solution:** `game.js`
- **Suspect portraits, website copy and final surprise:** `index.html`
- **Colors, typography and responsive layout:** `style.css` (`:root` contains the main color palette)
- **Browser tab icon:** `assets/favicon.svg`

There are no external dependencies, tracking scripts, cookie banners, or remote font downloads.

<details>
<summary>⚠️ SPOILER — solution and logic check (for the person hosting the game)</summary>

The murderer is **Felix Finch**, the weapon is the **engraved letter opener**, and the murder room is the **Portrait Gallery**.

The only complete assignment satisfying the ten clues is:

| Guest | Room | Object |
|---|---|---|
| Celeste Vale | Moonlit Library | Crystal atomizer |
| Felix Finch | Portrait Gallery | Engraved letter opener |
| Iris Bell | Sugar Kitchen | Brass candlestick |
| Theo Wren | Orchid Conservatory | Silver cake knife |

The first four clues identify Gallery = opener, Conservatory = knife, Kitchen = candlestick and therefore Library = atomizer. Statements 5–8 constrain the suspects to two possible complete arrangements. Exhibit 9 (Theo did not carry the opener) eliminates the alternate arrangement. Exhibit 10 explains the motive. The constraint system has been checked to have **exactly one solution**.

</details>

---

Made with love. ♡
