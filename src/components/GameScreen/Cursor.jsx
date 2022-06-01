/*
 * Game Cursor
 */

import AnimatedCursor from "react-animated-cursor"
import React from "react";

const Cursor = () => {
    return (
      <div className="cursor">
      <AnimatedCursor
        innerSize={8}
        outerSize={8}
        color='193, 11, 111'
        outerAlpha={0,2}
        innerScale={0,7}
        outerScale={5}
        hasBlendMode={true}
        outerStyle={{
        mixBlendMode: 'exclusion'}}
      />
      </div>
    );
  }

  export default Cursor;