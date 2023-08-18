addEventListener('DOMContentLoaded', main);
import './style.css';
import style from './style.module.css';

import { TandotypeApp } from "./tandotype-engine/app";
import { TandotypeConfig } from "./tandotype-engine/types";
import { TDTapsCounterUtility } from './tandotype-engine/utilities/chars-typed';
import { TDEmptyBlockUtility } from './tandotype-engine/utilities/empty-block';
import { TDCPMUtility } from './tandotype-engine/utilities/chars-per-minute';
import { TDWordsTypedUtility } from './tandotype-engine/utilities/words-types';
import { TDWPMUtility } from './tandotype-engine/utilities/words-per-minute';
// import { TDTimeDateUtility } from './tandotype-engine/utilities/timer';
// import { TDCharsTypingSpeedUtility } from './tandotype-engine/utilities/typing-speed';
// import { TDWordsTypedUtility } from './tandotype-engine/utilities/words-types';


function main(): void {
    const config: TandotypeConfig = {
        cssClasses: {
            app:            style.app,
            testArea:       style.textArea,
            utilsHolder:    style.utilsHolder,
            keyboard:       style.keyboard,
            keybutton:      style.keyButton,
            keypressed:     style.keypressed,
            utilityBlock:   'string',
            utilityText:    'string',
        },
    };

    const app = new TandotypeApp(config);
    app.renderUtils(
        // - 1
        ...app.loadUndefinedUtilites(
            TDEmptyBlockUtility({elementStyling: [style.helperHeaderBlock, style.defaultUtilityBlock].join(' '), nameStyling: '', valueStyling: ''}),
        ),
        // - 2
        app.wrapUtils(style.actionUtilsSubblock,
            app.wrapUtils(style.topActionsWrapper,
                ...app.loadTypingUtilities(
                    TDTapsCounterUtility({elementStyling: [style.utilityBlock, style.flex1].join(' ') , nameStyling: '', valueStyling: ''}),
                ),
                ...app.loadUndefinedUtilites(
                    TDEmptyBlockUtility({elementStyling: [style.utilityBlock, style.flex2].join(' '), nameStyling: '', valueStyling: ''}),
                ),
                ...app.loadTypingUtilities(
                    TDWordsTypedUtility({elementStyling: [style.utilityBlock, style.flex1].join(' '), nameStyling: '', valueStyling: ''}),
                ),
            ),
            app.wrapUtils(style.topActionsWrapper,
                ...app.loadTimerUtilities(
                    TDWPMUtility({elementStyling: [style.utilityBlock, style.flex1].join(' '), nameStyling: '', valueStyling: ''}),
                ),
                ...app.loadTimerUtilities(
                    TDCPMUtility({elementStyling: [style.utilityBlock, style.flex2].join(' '), nameStyling: '', valueStyling: ''}),
                ),
                // app.wrapUtils([style.secondColumnWrapperBottomOne, style.flex1].join(' '),
                //     ...app.loadUndefinedUtilites(
                //         TDEmptyBlockUtility({elementStyling: style.defaultBlock, nameStyling: '', valueStyling: ''}),
                //     ),
                // ),
                // app.wrapUtils(style.lastFlexBasicBlock,
                //     ...app.loadUndefinedUtilites(
                //         TDEmptyBlockUtility({elementStyling: [style.utilityBlock, style.flex1].join(' '), nameStyling: '', valueStyling: ''}),
                //     ),
                // ),
            ),
        ),
    );
    app.launch(document.body);
}