addEventListener('DOMContentLoaded', main);
import './style.css';
import style from './style.module.css';

import { TandotypeApp } from "./tandotype-engine/app";
import { TandotypeConfig } from "./tandotype-engine/types";
import { TDCharsTypedUtility } from './tandotype-engine/utilities/chars-typed';
import { TDTimeDateUtility } from './tandotype-engine/utilities/timer';
import { TDCharsTypingSpeedUtility } from './tandotype-engine/utilities/typing-speed';
import { TDWordsTypedUtility } from './tandotype-engine/utilities/words-types';


function main(): void {
    const config: TandotypeConfig = {
        keysLocales: new Map([
            ['default', 'qwertyuiopasdfghjklzxcvbnm'.split('')],
        ]),
        cssClasses: {
            app:            style.app,
            utilsHolder:    style.utilsHolder,
            keyboard:       style.keyboard,
            keybutton:      style.keyButton,
            keypressed:     style.keypressed,
            utilityBlock:   'string',
            utilityText:    'string',
        },
    };

    const app = new TandotypeApp(config);
    app.loadTimerUtilities(        
        TDTimeDateUtility({elementStyling: style.utilityComponent, nameStyling: style.utilityName, valueStyling: style.utilityValue}),
    );
    app.loadTypingUtilities(        
        TDCharsTypedUtility({elementStyling: style.elemCharsTyped, nameStyling: '', valueStyling: ''}),
        TDWordsTypedUtility({elementStyling: style.elemCharsTyped, nameStyling: '', valueStyling: ''}),
        TDCharsTypingSpeedUtility({elementStyling: style.elemCharsTyped, nameStyling: '', valueStyling: ''}),
    );
    app.render(document.body);
}