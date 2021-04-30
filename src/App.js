import React, { useState } from "react";
import "./App.css";
import * as Tone from "tone";

export default function App() {
  const synth = new Tone.FMSynth().toDestination();
  const duoSynth = new Tone.DuoSynth().toDestination();
  const drums = new Tone.MembraneSynth().toDestination();

const lowPass1 = new Tone.Filter({
frequency: 8000,
}).toMaster();

const lowPass2 = new Tone.Filter({
frequency: 12000,
}).toMaster();
const reverb = new Tone.JCReverb(0.4).toDestination();
const delay = new Tone.FeedbackDelay(0.5);
const cheby = new Tone.Chebyshev(50).toDestination();
const crusher = new Tone.BitCrusher(4).toDestination();
const snareDrum1 = new Tone.NoiseSynth({
  volume: 5,
  noise: {
    type: 'white',
    playbackRate: 3,
  },
  envelope: {
    attack: 0.001,
  decay: 0.20,
  sustain: 0.15,
  release: 0.03,
  },
}).connect(lowPass1);

const snareDrum2 = new Tone.NoiseSynth({
  volume: 5,
  noise: {
    type: 'white',
    playbackRate: 3,
  },
  envelope: {
    attack: 0.00,
    decay: 0.03,
    sustain: 0.01,
    release: 0.01,
  },
}).connect(lowPass2);


  function playNote(note) {
    synth.triggerAttackRelease(`${note}`, "4n");
  }
  function connectBit() {
    crusher.toDestination();
    synth.connect(crusher);
  }
  function connectCheb() {
    cheby.toDestination();
    synth.connect(cheby);
  }
  function connectReverb() {
    reverb.toDestination();
    delay.toDestination();
    synth.chain(reverb,delay);
  }
  function disconnectAll() {
    crusher.disconnect();
    cheby.disconnect();
    reverb.disconnect();
    delay.disconnect();
  }
  document.addEventListener("keydown", e => {
    switch (e.key) {
      case "q":
        return playNote("D3");
      case "w":
        return playNote("E3");
      case "e":
        return playNote("F3");
      case "r":
        return playNote("G3");
      case "t":
        return playNote("A3");
      case "y":
        return playNote("Bb3");
      default:
        return;
    }
  });
  document.addEventListener("keydown", e => {
    switch (e.key) {
      case "a":
        return playNote("C2");
      case "s":
        return playNote("D2");
      case "d":
        return playNote("Eb2");
      case "f":
        return playNote("F2");
      case "g":
        return playNote("G2");
      case "h":
        return playNote("Ab3");
      default:
        return;
    }
  });
  document.addEventListener("keydown", e => {
    switch (e.key) {
      case "z":
        return playNote("A4");
      case "x":
        return playNote("B4");
      case "c":
        return playNote("C4");
      case "v":
        return playNote("D4");
      case "b":
        return playNote("E4");
      case "n":
        return playNote("F#4");
      default:
        return;
    }
  });
  document.addEventListener("keydown", e => {
    switch (e.key) {
      case "1":
        return snareDrum1.triggerAttackRelease("8n");
      case "2":
        return snareDrum2.triggerAttackRelease("8n") ;
      case "4":
        return  drums.triggerAttackRelease("D1", "8n");
      case "5":
        return drums.triggerAttackRelease("A2", "8n");
      default:
        return;
    }
  });
  document.addEventListener("keydown", e => {
    switch (e.key) {
      case "7":
        return connectBit();
      case "8":
        return connectReverb();
      case "9":
        return connectCheb();
      case "0":
        return disconnectAll();
      default:
        return;
    }
  });
  return (
    <div className="App">
      <div class="note-wrapper">
      <h3 class="scalenames"> D-Minor Scale </h3>
        <button class="note1" onClick={() => playNote("D3")}>
          Q
        </button>
        <button class="note2" onClick={() => playNote("E3")}>
          W
        </button>
        <button class="note3" onClick={() => playNote("F3")}>
          E
        </button>
        <button class="note4" onClick={() => playNote("G3")}>
          R
        </button>
        <button class="note5" onClick={() => playNote("A3")}>
          T
        </button>
        <button class="note6" onClick={() => playNote("Bb3")}>
          Y
        </button>
      </div>
      <div class="note-wrapper">
      <h3 class="scalenames"> Harmonic Scale </h3>
        <button class="harm1" onClick={() => playNote("C2")}>
          A
        </button>
        <button class="harm2" onClick={() => playNote("D2")}>
          S
        </button>
        <button class="harm3" onClick={() => playNote("Eb2")}>
          D
        </button>
        <button class="harm4" onClick={() => playNote("F2")}>
          F
        </button>
        <button class="harm5" onClick={() => playNote("G2")}>
          G
        </button>
        <button class="harm6" onClick={() => playNote("Ab2")}>
          H
        </button>
      </div>
      <div class="note-wrapper">
      <h3 class="scalenames"> Melodic Scale </h3>
        <button class="mel1" onClick={() =>     playNote("A4", "4n")}>
          Z
        </button>
        <button class="mel2" onClick={() => playNote("B4", "4n")}>
          X
        </button>
        <button class="mel3" onClick={() => playNote("C4", "4n")}>
          C
        </button>
        <button class="mel4" onClick={() => playNote("D4", "4n")}>
          V
        </button>
        <button class="mel5" onClick={() => playNote("E4", "4n")}>
          B
        </button>
        <button class="mel6" onClick={() => playNote("F#4", "4n")}>
          N
        </button>
      </div>
      <div class="drumwrap">
      <button class="kick" onClick={() =>   drums.triggerAttackRelease("D1", "8n")}>
      KICK1 (numpad 4)
      </button>
      <button class="kick" onClick={() =>   drums.triggerAttackRelease("A2", "8n")}>
      KICK2 (numpad 5)
      </button>
      <button class="snare" onClick={() => snareDrum1.triggerAttackRelease("8n")}>
      SNARE1 (numpad 1)
      </button>
      <button class="snare" onClick={() =>   snareDrum2.triggerAttackRelease("8n")}>
      SNARE2 (numpad 2)
      </button>

      </div>
      <div class="effects">
        <button class="effect" onClick={() => connectBit()}>
         BitCrusher(numpad 7)
         </button>
         <button class="effect" onClick={() => connectReverb()}>
          Reverb(numpad 8)
          </button>
          <button class="effect" onClick={() => connectCheb()}>
           WahWah(numpad 9)
           </button>
           <button class="effect" onClick={() => connectCheb()}>
            DisconnectAll(numpad 0)
            </button>
      </div>
    </div>
  );
}
