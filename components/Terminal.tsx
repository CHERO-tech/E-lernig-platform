"use client";

import { useEffect, useRef, useState } from "react";

type Tok = "tok-kw" | "tok-str" | "tok-fn" | "tok-cm" | "tok-plain";
type Part = [Tok, string];
type Script = { tab: number; lines: Part[][] };

const SCRIPTS: Script[] = [
  {
    tab: 0,
    lines: [
      [["tok-cm", "// projects/booking-app/api.js"]],
      [
        ["tok-kw", "async function "],
        ["tok-fn", "createBooking"],
        ["tok-plain", "(req, res) {"],
      ],
      [
        ["tok-plain", "  const slot = "],
        ["tok-kw", "await "],
        ["tok-fn", "findSlot"],
        ["tok-plain", "(req.body);"],
      ],
      [
        ["tok-kw", "  if "],
        ["tok-plain", "(!slot) "],
        ["tok-kw", "return "],
        ["tok-fn", "res.status"],
        ["tok-plain", "("],
        ["tok-str", "409"],
        ["tok-plain", ");"],
      ],
      [
        ["tok-plain", "  res.json({ "],
        ["tok-str", "status: 'confirmed'"],
        ["tok-plain", " });"],
      ],
      [["tok-plain", "}"]],
      [["tok-cm", "// mentor review: passed ✓  deployed: staging"]],
    ],
  },
  {
    tab: 1,
    lines: [
      [["tok-cm", "# lab/router-config.txt"]],
      [
        ["tok-fn", "Router(config)# "],
        ["tok-plain", "interface GigabitEthernet0/1"],
      ],
      [
        ["tok-fn", "Router(config-if)# "],
        ["tok-plain", "ip address "],
        ["tok-str", "10.20.1.1 255.255.255.0"],
      ],
      [
        ["tok-fn", "Router(config-if)# "],
        ["tok-plain", "no shutdown"],
      ],
      [
        ["tok-fn", "Router# "],
        ["tok-plain", "show ip route"],
      ],
      [["tok-plain", "O    10.20.2.0/24 [110/2] via 10.20.1.2"]],
      [["tok-cm", "# lab result: route converged in 4s ✓"]],
    ],
  },
  {
    tab: 2,
    lines: [
      [["tok-cm", "# briefs/client-promo/render.log"]],
      [
        ["tok-fn", "ffmpeg "],
        ["tok-plain", "-i cut_final.mov \\"],
      ],
      [
        ["tok-plain", "  -vf "],
        ["tok-str", '"eq=contrast=1.08:saturation=1.15"'],
        ["tok-plain", " \\"],
      ],
      [["tok-plain", "  -c:a aac -b:a 192k out_grade.mp4"]],
      [
        ["tok-fn", "Frame "],
        ["tok-plain", "1440/1440  "],
        ["tok-fn", "Audio "],
        ["tok-plain", "sync: 0.00s"],
      ],
      [["tok-cm", "# client brief: delivered ✓"]],
    ],
  },
];

const TAB_LABELS = ["software-dev", "networking", "multimedia"];

export default function Terminal() {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function renderStatic(script: Script) {
      if (!body) return;
      body.innerHTML = "";
      script.lines.forEach((line, i) => {
        const ln = document.createElement("div");
        ln.className = "ln";
        const no = document.createElement("span");
        no.className = "no";
        no.textContent = String(i + 1);
        const code = document.createElement("span");
        code.className = "code";
        line.forEach((part) => {
          const span = document.createElement("span");
          span.className = part[0];
          span.textContent = part[1];
          code.appendChild(span);
        });
        ln.appendChild(no);
        ln.appendChild(code);
        body.appendChild(ln);
      });
    }

    if (reduce) {
      renderStatic(SCRIPTS[0]);
      const id = window.setTimeout(() => setActiveTab(0), 0);
      return () => window.clearTimeout(id);
    }

    let killed = false;
    let seq = 0;
    const timers: number[] = [];
    const schedule = (fn: () => void, delay: number) => {
      const id = window.setTimeout(fn, delay);
      timers.push(id);
      return id;
    };

    function typeScript(scriptIndex: number, cb: () => void) {
      const script = SCRIPTS[scriptIndex];
      setActiveTab(script.tab);
      if (!body) return;
      body.innerHTML = "";
      let lineIdx = 0;

      function nextLine() {
        if (killed || !body) return;
        if (lineIdx >= script.lines.length) {
          cb();
          return;
        }
        const line = script.lines[lineIdx];
        const ln = document.createElement("div");
        ln.className = "ln";
        const no = document.createElement("span");
        no.className = "no";
        no.textContent = String(lineIdx + 1);
        const code = document.createElement("span");
        code.className = "code";
        const caret = document.createElement("span");
        caret.className = "caret";
        ln.appendChild(no);
        ln.appendChild(code);
        ln.appendChild(caret);
        body.appendChild(ln);

        const flat: Part[] = [];
        line.forEach((part) => {
          for (let i = 0; i < part[1].length; i++) flat.push([part[0], part[1][i]]);
        });

        let ci = 0;
        let curSpan: HTMLSpanElement | null = null;
        let curClass: Tok | null = null;

        function typeChar() {
          if (killed) return;
          if (ci >= flat.length) {
            lineIdx++;
            schedule(nextLine, 220);
            return;
          }
          const part = flat[ci];
          if (part[0] !== curClass) {
            curSpan = document.createElement("span");
            curSpan.className = part[0];
            // caret is a sibling of `code`, not a child of it — append
            // straight onto `code` so it lands after existing text and
            // ahead of the (sibling) caret, which stays visually last.
            code.appendChild(curSpan);
            curClass = part[0];
          }
          curSpan!.textContent += part[1];
          ci++;
          schedule(typeChar, 12 + Math.random() * 22);
        }
        typeChar();
      }
      nextLine();
    }

    function loop() {
      if (killed) return;
      typeScript(seq, () => {
        schedule(() => {
          seq = (seq + 1) % SCRIPTS.length;
          loop();
        }, 2200);
      });
    }

    loop();

    return () => {
      killed = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return (
    <div
      className="terminal"
      role="img"
      aria-label="Animated terminal showing example project code from Forge tracks"
    >
      <div className="terminal-bar">
        <span className="terminal-dot" />
        <span className="terminal-dot" />
        <span className="terminal-dot" />
        <div className="terminal-tabs">
          {TAB_LABELS.map((label, i) => (
            <span key={label} className={`terminal-tab${activeTab === i ? " active" : ""}`}>
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className="terminal-body" ref={bodyRef} aria-hidden="true">
        <div className="ln">
          <span className="no">1</span>
          <span className="code" />
          <span className="caret" />
        </div>
      </div>
    </div>
  );
}
