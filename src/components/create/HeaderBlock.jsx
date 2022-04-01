import React from 'react';
import MailOption from "./MailOption";
import NameCreation from "./NameCreation";
import SelectorGroup from "../SelectorGroup";

function HeaderBlock({name, handle, isFilter, mailOption, handleMailOption, selectedGroupName, handleSelector }) {

    return (
        <div className={"double__block header__block" }>
            <NameCreation name={name} handle={handle}/>
            {isFilter ?
                <MailOption mailOption={mailOption} handleMailOption={handleMailOption}/>
                :
                <SelectorGroup selectedGroupName={selectedGroupName} handleSelector={handleSelector}/>
            }
        </div>
    );
}

export default HeaderBlock;