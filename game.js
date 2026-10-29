/*
 * Death at the Velvet Hour — a static, offline-friendly mystery for Tania.
 * No frameworks, APIs, accounts, or external assets required.
 * The logical solution is unique; see README.md for the proof / spoiler.
 */
(() => {
  'use strict';

  const STORAGE_KEY = 'tania-velvet-hour-mystery-v1';
  const people = ['Celeste', 'Felix', 'Iris', 'Theo'];
  const rooms = [
    ['Conserv.', 'Orchid Conservatory'],
    ['Gallery', 'Portrait Gallery'],
    ['Library', 'Moonlit Library'],
    ['Kitchen', 'Sugar Kitchen']
  ];
  const objects = [
    ['Candle', 'Brass candlestick'],
    ['Atomizer', 'Crystal atomizer'],
    ['Opener', 'Engraved letter opener'],
    ['Knife', 'Silver cake knife']
  ];

  const chapters = [
    { title: 'THE SCENE', subtitle: 'Forensic evidence', label: 'I', unlockAt: 0, ids: ['gold', 'wound', 'sugar', 'wax'] },
    { title: 'THE GUESTS', subtitle: 'Statements & sightings', label: 'II', unlockAt: 4, ids: ['iris', 'celeste', 'theo', 'felix'] },
    { title: 'THE SECRET', subtitle: 'The final envelope', label: 'III', unlockAt: 8, ids: ['receipt', 'programme'] }
  ];

  const clues = [
    {
      id: 'gold', number: '01', chapter: 0, symbol: '❖', title: 'A Dusting of Gold',
      teaser: 'A strange shimmer clings to the victim’s sleeve.',
      body: [
        'Julian Bellamy was discovered on the grand staircase at 9:23 p.m. Yet there was no sign of a struggle on its immaculate carpet. The body had been brought there after the attack.',
        'The examiner found flakes of fresh gold varnish inside his cuff. Only the frames in the Portrait Gallery had been regilded that afternoon. The other three rooms had no fresh gilding.'
      ],
      finding: 'The murder happened in the Portrait Gallery.'
    },
    {
      id: 'wound', number: '02', chapter: 0, symbol: '⌁', title: 'The Tell-tale Nick',
      teaser: 'The injury is strangely precise.',
      body: [
        'The fatal wound was narrow and deep, with a tiny notch along one edge. The brass candlestick is blunt, the crystal atomizer has no blade, and the cake knife has a much broader cutting edge.',
        'An ornate letter opener was photographed before the gala. Its narrow tip bears one distinctive nick in exactly the right place.'
      ],
      finding: 'The murder weapon was the engraved letter opener.'
    },
    {
      id: 'sugar', number: '03', chapter: 0, symbol: '❀', title: 'Sugar Among Orchids',
      teaser: 'Sweet crystals in a room full of flowers.',
      body: [
        'A fine line of icing sugar crossed the Orchid Conservatory and ended beside the potting bench. Beneath an empty orchid pot lay a linen wrap marked with the unmistakable outline of the silver cake knife.',
        'The house inventory confirms it: during the blackout, the guest in the Conservatory was carrying the cake knife.'
      ],
      finding: 'The silver cake knife was in the Orchid Conservatory.'
    },
    {
      id: 'wax', number: '04', chapter: 0, symbol: '♜', title: 'The Candlestick’s Foot',
      teaser: 'A trace of vanilla batter refuses to budge.',
      body: [
        'The brass candlestick was returned to the display with wet flour and dark vanilla batter stuck to its base. The Sugar Kitchen was the only room preparing that batter at the time of the blackout.',
        'The steward found no matching residue anywhere else. Whoever held the candlestick was inside the Sugar Kitchen.'
      ],
      finding: 'The brass candlestick was in the Sugar Kitchen.'
    },
    {
      id: 'iris', number: '05', chapter: 1, symbol: '✳', title: 'Iris and the Two Doors',
      teaser: 'Two passages the pâtissière never crossed.',
      body: [
        'Iris Bell insists she was busy preparing the midnight dessert course. The porter stationed at the two east-side doors supports a narrower point: during the critical minutes, Iris did not pass into the Portrait Gallery or the Orchid Conservatory.',
        'That does not prove her innocence. It does, however, rule out two of the four rooms.'
      ],
      finding: 'Iris was not in the Gallery or Conservatory.'
    },
    {
      id: 'celeste', number: '06', chapter: 1, symbol: '✧', title: 'Celeste’s Silk Ribbon',
      teaser: 'An eyewitness remembers a scarlet train.',
      body: [
        'Celeste Vale wore a long ribbon of burgundy silk that evening. The cloakroom attendant remembers following its trail toward the north corridor at 9:16 p.m.',
        'The north corridor gave access to the Moonlit Library and the Orchid Conservatory, not the Portrait Gallery or the Sugar Kitchen. Celeste remained on that side until the lights returned.'
      ],
      finding: 'Celeste was not in the Gallery or Kitchen.'
    },
    {
      id: 'theo', number: '07', chapter: 1, symbol: '❦', title: 'The Photographer’s Film',
      teaser: 'The camera witnessed a curious absence.',
      body: [
        'An automated infrared camera recorded the entrances to the Moonlit Library and the Sugar Kitchen continuously from 9:15 to 9:19, even during the blackout.',
        'Theo Wren never appears entering either doorway. He therefore could not have been in either of those rooms at the crucial moment.'
      ],
      finding: 'Theo was not in the Library or Kitchen.'
    },
    {
      id: 'felix', number: '08', chapter: 1, symbol: '♫', title: 'The Absent Encore',
      teaser: 'A pianist takes an unexpectedly short route.',
      body: [
        'Felix Finch left the drawing room at 9:16, telling the footman he was going straight down the south corridor. The footman saw him remain there until the lights failed.',
        'Only the Portrait Gallery and Sugar Kitchen were accessible from that corridor without turning back. The footman is certain Felix never turned back.'
      ],
      finding: 'Felix was not in the Library or Conservatory.'
    },
    {
      id: 'receipt', number: '09', chapter: 2, symbol: '✉', title: 'A Crossed-out Name',
      teaser: 'An inventory slip eliminates one last possibility.',
      body: [
        'Each guest signed for one distinct display object before the lights went out. The valet’s carbon-copy inventory slip has Theo’s name deliberately crossed out beside the engraved letter opener.',
        'The valet confirms that Theo refused to carry it. Each guest kept their original object for the entire blackout; none of the four objects changed hands.'
      ],
      finding: 'Theo did not carry the engraved letter opener.'
    },
    {
      id: 'programme', number: '10', chapter: 2, symbol: '♩', title: 'A Note in the Margin',
      teaser: 'An unplayed song. An unpaid debt.',
      body: [
        'Inside Julian’s folded concert programme, investigators find a message written in his own hand: “Felix — I know about the missing gala funds. We speak when the clock strikes.”',
        'Felix had been secretly diverting money from the charity soirée. Julian was due to expose the theft that very night. Motive is not proof, of course — but with the rooms and objects accounted for, it may complete the picture.'
      ],
      finding: 'Felix had a motive, but the logic grid must establish who killed Julian.'
    }
  ];
  const clueById = Object.fromEntries(clues.map(clue => [clue.id, clue]));
  const hints = [
    'Start with the objects: the cake knife belongs in the Conservatory, the candlestick in the Kitchen, and the letter opener in the Gallery. That leaves only one object for the Library.',
    'Theo could only be in the Gallery or Conservatory. But the Gallery had the letter opener, and the valet proved Theo did not carry it.',
    'With Theo in the Conservatory, Celeste must be in the Library. Then consider Iris’s two excluded rooms. Which room is left for Felix?'
  ];

  function blankGrid() { return Array(16).fill(0); }
  function makeNewState() {
    return { started: false, startedAt: null, solved: false, elapsedAtFinish: 0, readIds: [], pinnedIds: [], notes: '', hintsUsed: 0, grid: { rooms: blankGrid(), objects: blankGrid() } };
  }
  function loadState() {
    const fresh = makeNewState();
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!stored || typeof stored !== 'object') return fresh;
      fresh.started = stored.started === true;
      fresh.startedAt = Number.isFinite(stored.startedAt) && stored.startedAt > 0 ? stored.startedAt : Date.now();
      fresh.solved = stored.solved === true;
      fresh.elapsedAtFinish = Number.isFinite(stored.elapsedAtFinish) ? stored.elapsedAtFinish : 0;
      fresh.readIds = Array.isArray(stored.readIds) ? stored.readIds.filter(x => clueById[x]) : [];
      fresh.pinnedIds = Array.isArray(stored.pinnedIds) ? stored.pinnedIds.filter(x => clueById[x]) : [];
      fresh.notes = typeof stored.notes === 'string' ? stored.notes : '';
      fresh.hintsUsed = Math.min(3, Math.max(0, Number(stored.hintsUsed) || 0));
      for (const kind of ['rooms', 'objects']) {
        if (stored.grid && Array.isArray(stored.grid[kind]) && stored.grid[kind].length === 16) {
          fresh.grid[kind] = stored.grid[kind].map(x => [0,1,2].includes(x) ? x : 0);
        }
      }
      if (!fresh.started) fresh.solved = false;
      return fresh;
    } catch { return fresh; }
  }
  let state = loadState();
  let activeClueId = null;

  const $ = (id) => document.getElementById(id);
  function save() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* Private mode or storage unavailable */ } }
  function announce(message) { $('liveAnnouncer').textContent = message; }
  function prettyTime(ms) {
    const secs = Math.max(0, Math.floor(ms / 1000));
    return `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;
  }
  function updateTimer() {
    const elapsed = state.solved ? state.elapsedAtFinish : (state.started ? Date.now() - state.startedAt : 0);
    $('timer').textContent = prettyTime(elapsed);
  }
  function evidenceCount() { return new Set(state.readIds).size; }
  function stageUnlocked(index) { return evidenceCount() >= chapters[index].unlockAt; }

  function renderProgress() {
    const count = evidenceCount();
    $('readCount').textContent = String(count);
    $('evidenceProgress').setAttribute('aria-valuenow', String(count));
    $('evidenceProgressFill').style.width = `${(count / clues.length) * 100}%`;
    document.querySelectorAll('.step').forEach((step, index) => {
      const chapter = chapters[index];
      const done = chapter.ids.every(id => state.readIds.includes(id));
      step.classList.toggle('is-done', done);
      step.classList.toggle('is-active', !done && stageUnlocked(index) && (index === 2 || !stageUnlocked(index + 1)));
    });
    const ready = count === clues.length;
    $('accuseButton').disabled = !ready;
    $('unlockNotice').textContent = ready
      ? 'The evidence is complete. Your theory is ready.'
      : `Examine ${clues.length - count} more ${clues.length - count === 1 ? 'piece' : 'pieces'} of evidence to seal your theory.`;
  }
  function buildEvidenceCard(clue) {
    const reviewed = state.readIds.includes(clue.id);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `evidence-card${reviewed ? ' is-read' : ''}`;
    button.setAttribute('aria-label', `Examine exhibit ${clue.number}: ${clue.title}${reviewed ? ', reviewed' : ''}`);
    button.innerHTML = `
      <span class="evidence-top"><span>EXHIBIT NO. ${clue.number}</span><span class="evidence-icon" aria-hidden="true">${clue.symbol}</span></span>
      <span><h4>${clue.title}</h4><p class="teaser">${clue.teaser}</p></span>
      <span class="status"><span>${reviewed ? '✓' : '↗'}</span> ${reviewed ? 'REVIEW AGAIN' : 'OPEN EVIDENCE'}</span>`;
    button.addEventListener('click', () => openClue(clue.id));
    return button;
  }
  function renderChapters() {
    const root = $('chapterList');
    root.replaceChildren();
    chapters.forEach((chapter, index) => {
      const block = document.createElement('section');
      block.className = 'chapter-block';
      const heading = document.createElement('div');
      heading.className = 'chapter-heading';
      const viewed = chapter.ids.filter(id => state.readIds.includes(id)).length;
      heading.innerHTML = `<h3><span>CHAPTER ${chapter.label}</span>${chapter.subtitle}</h3><span>${viewed} / ${chapter.ids.length} FILED</span>`;
      block.appendChild(heading);
      if (stageUnlocked(index)) {
        const cards = document.createElement('div');
        cards.className = 'evidence-cards';
        chapter.ids.forEach(id => cards.appendChild(buildEvidenceCard(clueById[id])));
        block.appendChild(cards);
      } else {
        const lock = document.createElement('div');
        lock.className = 'locked-panel';
        const remaining = chapter.unlockAt - evidenceCount();
        lock.innerHTML = `<span class="locked-icon" aria-hidden="true">♙</span><div><h4>Envelope sealed</h4><p>Examine ${remaining} more ${remaining === 1 ? 'exhibit' : 'exhibits'} to unlock this chapter.</p></div>`;
        block.appendChild(lock);
      }
      root.appendChild(block);
    });
    renderProgress();
  }

  function openClue(id) {
    const clue = clueById[id];
    if (!clue || !stageUnlocked(clue.chapter)) return;
    activeClueId = id;
    if (!state.readIds.includes(id)) {
      state.readIds.push(id);
      save();
      renderChapters();
      if (evidenceCount() === 4) announce('The second chapter is now unlocked.');
      if (evidenceCount() === 8) announce('The final sealed envelope is now unlocked.');
      if (evidenceCount() === 10) announce('All evidence examined. You can now make your accusation.');
    }
    $('dialogPacket').textContent = `CHAPTER ${chapters[clue.chapter].label}`;
    $('dialogNumber').textContent = `EXHIBIT NO. ${clue.number} · CONFIDENTIAL`;
    $('dialogSymbol').textContent = clue.symbol;
    $('dialogTitle').textContent = clue.title;
    $('dialogBody').replaceChildren(...clue.body.map(text => {
      const p = document.createElement('p'); p.textContent = text; return p;
    }));
    $('dialogFinding').textContent = clue.finding;
    updatePinButton();
    $('clueDialog').showModal();
  }
  function updatePinButton() {
    const pinned = state.pinnedIds.includes(activeClueId);
    $('pinClueButton').textContent = pinned ? '✓  Added to notebook' : '✎  Add to notebook';
    $('pinClueButton').disabled = pinned;
  }
  function pinClue() {
    if (!activeClueId || state.pinnedIds.includes(activeClueId)) return;
    const clue = clueById[activeClueId];
    state.notes = `${state.notes.trimEnd()}${state.notes.trim() ? '\n' : ''}• ${clue.finding}\n`;
    state.pinnedIds.push(activeClueId);
    $('notesInput').value = state.notes;
    save();
    updatePinButton();
    announce('Finding added to your notebook.');
  }

  function renderGrid(kind) {
    const choices = kind === 'rooms' ? rooms : objects;
    const wrapper = $(kind + 'Grid');
    const table = document.createElement('table');
    table.className = 'logic-table';
    const thead = document.createElement('thead');
    const top = document.createElement('tr');
    const empty = document.createElement('th');
    empty.scope = 'col'; empty.textContent = 'SUSPECT'; top.appendChild(empty);
    choices.forEach(([short, full]) => {
      const th = document.createElement('th');
      th.scope = 'col'; th.textContent = short; th.title = full;
      top.appendChild(th);
    });
    thead.appendChild(top); table.appendChild(thead);
    const tbody = document.createElement('tbody');
    people.forEach((person, row) => {
      const tr = document.createElement('tr');
      const th = document.createElement('th'); th.scope = 'row'; th.textContent = person; tr.appendChild(th);
      choices.forEach(([,full], col) => {
        const td = document.createElement('td');
        const button = document.createElement('button');
        button.type = 'button'; button.className = 'grid-cell';
        button.dataset.kind = kind; button.dataset.index = String(row * 4 + col);
        button.dataset.description = `${person} — ${full}`;
        updateGridCell(button, state.grid[kind][row*4+col]);
        button.addEventListener('click', () => {
          const idx = row * 4 + col;
          const next = (state.grid[kind][idx] + 1) % 3;
          state.grid[kind][idx] = next;
          updateGridCell(button, next);
          save();
        });
        td.appendChild(button); tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    wrapper.replaceChildren(table);
  }
  function updateGridCell(button, stateValue) {
    button.classList.toggle('is-no', stateValue === 1);
    button.classList.toggle('is-yes', stateValue === 2);
    button.textContent = stateValue === 1 ? '✕' : stateValue === 2 ? '✓' : '·';
    button.setAttribute('aria-label', `${button.dataset.description}: ${['unknown','no','yes'][stateValue]}. Activate to change.`);
    button.title = `${button.dataset.description}: ${['unknown','no','yes'][stateValue]}`;
  }
  function clearGrids() {
    if (state.grid.rooms.every(v=>v===0) && state.grid.objects.every(v=>v===0)) return;
    if (!window.confirm('Clear both logic grids? Your written notes will be kept.')) return;
    state.grid = { rooms: blankGrid(), objects: blankGrid() };
    renderGrid('rooms'); renderGrid('objects'); save();
    announce('Logic grids cleared.');
  }
  function revealHint() {
    if (state.hintsUsed >= hints.length) return;
    state.hintsUsed += 1;
    save();
    renderHint();
    announce(`Hint ${state.hintsUsed} revealed.`);
  }
  function renderHint() {
    if (state.hintsUsed > 0) {
      $('hintText').textContent = `HINT ${state.hintsUsed} OF ${hints.length} — ${hints[state.hintsUsed-1]}`;
    } else {
      $('hintText').textContent = 'A brilliant detective sometimes needs a nudge. Hints are completely optional.';
    }
    $('hintButton').disabled = state.hintsUsed >= hints.length;
    $('hintButton').innerHTML = state.hintsUsed >= hints.length ? 'All hints revealed ✓' : `Reveal ${state.hintsUsed ? 'another' : 'a'} hint <span>↗</span>`;
  }

  function setJournalTab(tab) {
    const notes = tab === 'notes';
    $('notebookPanel').hidden = !notes;
    $('verdictPanel').hidden = notes;
    $('notesTab').classList.toggle('is-selected', notes);
    $('verdictTab').classList.toggle('is-selected', !notes);
    $('notesTab').setAttribute('aria-selected', String(notes));
    $('verdictTab').setAttribute('aria-selected', String(!notes));
  }
  function setMobileView(view, shouldScroll = true) {
    document.body.dataset.mobileView = view;
    setJournalTab(view === 'verdict' ? 'verdict' : 'notes');
    [['case','mobileCase'],['notes','mobileNotes'],['verdict','mobileVerdict']].forEach(([name,id]) => {
      const button = $(id);
      button.classList.toggle('is-current', name === view);
      if (name === view) button.setAttribute('aria-current','page');
      else button.removeAttribute('aria-current');
    });
    if (shouldScroll && window.matchMedia('(max-width: 860px)').matches) {
      $('gameLayout').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  function submitVerdict(e) {
    e.preventDefault();
    if (evidenceCount() !== clues.length) return;
    const who = $('killerSelect').value;
    const weapon = $('weaponSelect').value;
    const room = $('roomSelect').value;
    if (!who || !weapon || !room) {
      $('verdictFeedback').textContent = 'Every accusation needs a suspect, an object, and a room.';
      return;
    }
    if (who === 'Felix' && weapon === 'letter opener' && room === 'gallery') {
      state.solved = true;
      state.elapsedAtFinish = Math.max(0, Date.now() - state.startedAt);
      save();
      updateTimer();
      $('finalTime').textContent = `SOLVED IN ${prettyTime(state.elapsedAtFinish)}`;
      $('verdictFeedback').textContent = '';
      $('successOverlay').hidden = false;
      $('playAgainButton').focus();
    } else {
      $('verdictFeedback').textContent = 'Not quite, detective. Something in that theory contradicts the evidence. Revisit the grids and try again. ♡';
      announce('Your accusation does not fit all the clues. You may try again.');
    }
  }
  function startGame() {
    state.started = true;
    state.startedAt = Date.now();
    save();
    $('welcomeOverlay').hidden = true;
    updateTimer();
    window.scrollTo({top:0,behavior:'instant'});
    $('mobileCase').focus({preventScroll:true});
  }
  function resetGame() {
    state = makeNewState();
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* no persistent storage */ }
    $('successOverlay').hidden = true;
    $('welcomeOverlay').hidden = false;
    $('notesInput').value = '';
    $('killerSelect').value = '';
    $('weaponSelect').value = '';
    $('roomSelect').value = '';
    $('verdictFeedback').textContent = '';
    renderGrid('rooms'); renderGrid('objects');
    renderHint(); renderChapters(); updateTimer();
    setMobileView('case', false);
    window.scrollTo({top:0,behavior:'instant'});
    $('startButton').focus();
  }
  function init() {
    $('notesInput').value = state.notes;
    $('notesInput').addEventListener('input', event => {
      state.notes = event.target.value;
      save();
    });
    $('startButton').addEventListener('click', startGame);
    $('restartButton').addEventListener('click', () => {
      if (window.confirm('Start a new case? This will erase your evidence, notes and grid markings.')) resetGame();
    });
    $('playAgainButton').addEventListener('click', resetGame);
    $('closeDialog').addEventListener('click', () => $('clueDialog').close());
    $('nextClueButton').addEventListener('click', () => $('clueDialog').close());
    $('pinClueButton').addEventListener('click', pinClue);
    $('clueDialog').addEventListener('click', event => {
      if (event.target === $('clueDialog')) $('clueDialog').close();
    });
    $('clearGridButton').addEventListener('click', clearGrids);
    $('hintButton').addEventListener('click', revealHint);
    $('notesTab').addEventListener('click', () => setJournalTab('notes'));
    $('verdictTab').addEventListener('click', () => setJournalTab('verdict'));
    $('mobileCase').addEventListener('click', () => setMobileView('case'));
    $('mobileNotes').addEventListener('click', () => setMobileView('notes'));
    $('mobileVerdict').addEventListener('click', () => setMobileView('verdict'));
    $('verdictForm').addEventListener('submit', submitVerdict);
    renderGrid('rooms'); renderGrid('objects');
    renderHint(); renderChapters(); updateTimer();
    setJournalTab('notes');
    setMobileView('case', false);
    $('welcomeOverlay').hidden = state.started;
    if (state.solved) {
      $('finalTime').textContent = `SOLVED IN ${prettyTime(state.elapsedAtFinish)}`;
      $('successOverlay').hidden = false;
    }
    window.setInterval(updateTimer, 1000);
  }
  init();
})();
