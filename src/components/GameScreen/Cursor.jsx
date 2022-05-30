/*
 * Game Cursor
 */

import AnimatedCursor from "react-animated-cursor"
import React from "react";

/*
import { useRef } from 'react';
import './App.css'

const Cursor = () => {
    const cursorInner = useRef(null);
    const cursorOuter = useRef(null);
    return (
      <>
        <div ref={cursorOuter} className = "cursorOuter"></div>
        <div ref={cursorInner} className = "cursorInner"></div>
      </>
    );
  };
*/

const Cursor = () => {
    return (
      <div>
      <AnimatedCursor
        innerSize={8}
        outerSize={8}
        color='(84, 252, 92)'
        outerAlpha={1}
        innerScale={2}
        outerScale={5}
        hasBlendMode={true}
        outerStyle={{
        mixBlendMode: 'exclusion'}}
        clickables={[ 
          'a',
          'input[type="text"]',
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          'label[for]',
          'select',
          'textarea',
          'button',
          '.link'
        ]}
      />
      </div>
    );
  }

  export default Cursor;