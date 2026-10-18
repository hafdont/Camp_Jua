
(() => {
    'use strict';

    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => [...r.querySelectorAll(s)];

    const toggle = $('.jx-menu-toggle');
    const menu = $('.jx-menu');

    if (toggle && menu) {
        const set = open => {
            menu.classList.toggle('open', open);
            toggle.setAttribute('aria-expanded', String(open));
            menu.setAttribute('aria-hidden', String(!open));
            document.body.style.overflow = open ? 'hidden' : '';
        };

        toggle.addEventListener('click', () => {
            set(!menu.classList.contains('open'));
        });

        $$('a', menu).forEach(a => {
            a.addEventListener('click', () => set(false));
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') set(false);
        });
    }

    const catalogue = [
        {
            title: 'Liwe Liwalo',
            subtitle: 'By Kama Ft Killer Loop. Produced by Kunta',
            type: 'music',
            duration: '—',
            art: 'JUA',
            cover: 'linear-gradient(140deg,#75884d,#233529 65%,#0e1815)',
            src: 'static/audio/liweliwalo.mpeg',
            video: ''
        },
        {
            title: 'Dumb Deaf & Blind',
            subtitle: 'By Kama, Ft KWame and Roba',
            type: 'music',
            duration: '—',
            art: 'ROOTS',
            cover: 'linear-gradient(140deg,#9b6140,#3a2924 65%,#181414)',
            src: 'static/audio/dumbdeaf&blind.mpeg',
            video: ''
        },
        {
            title: 'Angalia Saa',
            subtitle: 'by Ukoo Flani Mau Mau',
            type: 'video',
            duration: '—',
            art: 'VISION',
            cover: 'linear-gradient(140deg,#526b78,#283d43 65%,#0d171a)',
            src: '',
            video: 'static/videos/ANGALIA_SAA.mp4',
        },
        {
            title: 'Live Sessions',
            subtitle: 'Live performance recordings',
            type: 'video',
            duration: '—',
            art: 'LIVE',
            cover: 'linear-gradient(140deg,#756348,#342e24 65%,#13120f)',
            src: '',
            video: ''
        },
        {
            title: 'Freedom Frequencies',
            subtitle: 'Future audio collection',
            type: 'music',
            duration: '—',
            art: 'FREE',
            cover: 'linear-gradient(140deg,#748367,#26382d 65%,#101814)',
            src: '',
            video: ''
        },
        {
            title: 'Collaborations',
            subtitle: 'Creative collaborations',
            type: 'music',
            duration: '—',
            art: 'TOGETHER',
            cover: 'linear-gradient(140deg,#6d587c,#32243e 65%,#15111b)',
            src: '',
            video: ''
        }
    ];

    const records = $('#jx-records');
    const tracks = $('#jx-tracks');
    const player = $('.jx-player');

    if (!records || !tracks || !player) return;

    let current = -1;
    let filter = 'all';

    const audio = new Audio();
    audio.preload = 'none';

    const fmt = t =>
        Number.isFinite(t)
            ? `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`
            : '0:00';

    function render() {
        records.innerHTML = '';

        catalogue.forEach((item, i) => {
            if (filter !== 'all' && item.type !== filter) return;

            const card = document.createElement('article');
            card.className = 'jx-record';

            card.innerHTML = `
                <div class="jx-cover" style="--cover:${item.cover}">
                    <b>${item.art}</b>
                    <button type="button" aria-label="Open ${item.title}">▶</button>
                </div>

                <div class="jx-record-meta">
                    <div>
                        <h3>${item.title}</h3>
                        <p>${item.subtitle}</p>
                    </div>

                    <span class="jx-type">${item.type.toUpperCase()}</span>
                </div>
            `;

            card.querySelector('button').addEventListener('click', () => open(i));

            records.append(card);
        });

        tracks.innerHTML = '';

        catalogue.forEach((item, i) => {
            const b = document.createElement('button');

            b.type = 'button';
            b.className = 'jx-track';

            b.innerHTML = `
                <span>${String(i + 1).padStart(2, '0')}</span>
                <strong>${item.title}</strong>
                <small>${item.type === 'video' ? 'VIDEO' : 'AUDIO'} · ${item.duration}</small>
                <b>↗</b>
            `;

            b.addEventListener('click', () => open(i));

            tracks.append(b);
        });
    }

    function open(i) {
        const item = catalogue[i];

        if (!item) return;

        if (item.type === 'video') {
            if (!item.video) {
                alert('Video preview placeholder — add the video file URL in static/js/experience.js.');
                return;
            }

            showVideo(item);
            return;
        }

        if (!item.src) {
            alert('Audio preview placeholder — add the audio file URL in static/js/experience.js.');
            return;
        }

        current = i;

        audio.pause();
        audio.removeAttribute('src');
        audio.load();

        audio.src = item.src;
        audio.load();

        player.classList.add('visible');

        $('.jx-player-title strong').textContent = item.title;
        $('.jx-player-title small').textContent = item.subtitle;

        audio.play().catch(() => {});

        sync();
    }

    function sync() {
        $('.jx-play').textContent = audio.paused ? '▶' : '❚❚';

        $('.jx-play').setAttribute(
            'aria-label',
            audio.paused ? 'Play' : 'Pause'
        );
    }

    $('.jx-play').addEventListener('click', () => {
        if (!audio.src) return;

        audio.paused
            ? audio.play().catch(() => {})
            : audio.pause();

        sync();
    });

    $('.jx-prev').addEventListener('click', () => step(-1));
    $('.jx-next').addEventListener('click', () => step(1));

    function step(dir) {
        for (let k = 1; k <= catalogue.length; k++) {
            const i = (current + dir * k + catalogue.length) % catalogue.length;

            if (catalogue[i].type === 'music' && catalogue[i].src) {
                open(i);
                return;
            }
        }
    }

    const seek = $('.jx-seek');

    audio.addEventListener('timeupdate', () => {
        seek.value = audio.duration
            ? Math.round(audio.currentTime / audio.duration * 1000)
            : 0;

        $('.jx-current').textContent = fmt(audio.currentTime);
        $('.jx-duration').textContent = fmt(audio.duration);
    });

    seek.addEventListener('input', () => {
        if (Number.isFinite(audio.duration)) {
            audio.currentTime = audio.duration * Number(seek.value) / 1000;
        }
    });

    $('.jx-volume').addEventListener('input', e => {
        audio.volume = Number(e.target.value);
    });

    audio.addEventListener('ended', () => step(1));
    audio.addEventListener('pause', sync);
    audio.addEventListener('play', sync);

    $$('.jx-filter').forEach(b => {
        b.addEventListener('click', () => {
            filter = b.dataset.filter;

            $$('.jx-filter').forEach(x => {
                x.classList.toggle('active', x === b);
            });

            render();
        });
    });

    const modal = $('.jx-video-modal');
    const video = $('.jx-video-modal video');

    function showVideo(item) {
        audio.pause();

        video.src = item.video;

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');

        $('.jx-video-shell header strong').textContent = item.title;

        video.load();
    }

    function closeVideo() {
        video.pause();
        video.removeAttribute('src');
        video.load();

        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
    }

    $('.jx-video-close').addEventListener('click', closeVideo);

    modal.addEventListener('click', e => {
        if (e.target === modal) closeVideo();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeVideo();
    });

    render();
})();
