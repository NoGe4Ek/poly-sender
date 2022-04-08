import React from 'react';
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import SendIcon from "@mui/icons-material/Send";
import {Accordion, AccordionDetails, AccordionSummary, Button} from "@mui/material";
import FilterRowInfo from "./FilterRowInfo";
import ButtonActionGroup from "../ButtonActionGroup";
import axios from "axios";

function FilterAccordionItem(
    {
        filter,
        setId,
        setPopupShareActive,
        setLoading,
        setNameFilter,
        setSelectedMailOption
    }) {

    return (
        <Accordion
            inputprops={{position: "initial"}}
            sx={{marginBottom: "10px"}}
            disableGutters={true}
        >
            <FilterAccordionSummary filter={filter}/>
            <FilterAccordionDetails
                filter={filter}
                setId={setId}
                setPopupShareActive={setPopupShareActive}
                setLoading={setLoading}
                setNameFilter={setNameFilter}
                setSelectedMailOption={setSelectedMailOption}
            />
        </Accordion>
    );
}

function FilterAccordionSummary({filter}) {
    return (
        <AccordionSummary>
            <div className="header__accordion__container">
                <div className="header__accordion__block">
                    {ModeFilter(filter.mode)}
                    <p className="header__accordion__label">{filter.filterName}</p>
                </div>
                <Button onClick={(event) => {
                    event.stopPropagation()
                }}>Отправить</Button>
            </div>
        </AccordionSummary>
    );
}

function FilterAccordionDetails(
    {
        filter,
        setId,
        setPopupShareActive,
        setLoading,
        setNameFilter,
        setSelectedMailOption
    }
) {
    return (
        <AccordionDetails>
            <div className="background body__accordion__container">
                <div className="body__accordion__info">
                    <FilterRowInfo nameRow="Почтовый адрес:" valueRow={filter.mail}/>
                    <FilterRowInfo nameRow="Количество студентов:" valueRow={filter.students.length}/>
                    <FilterRowInfo nameRow="Создан:" valueRow={getType(filter.type)}/>
                    <FilterRowInfo nameRow="Режим:" valueRow={filter.mode}/>
                    {filter.mode === "manual" ?
                        <FilterRowInfo nameRow="Полученные ответы:" valueRow={filter.mailCounter}/> : null}
                    <FilterRowInfo nameRow="Дата создания:" valueRow={filter.created}/>
                </div>
                <div className="body__accordion__buttons">
                    <ButtonActionGroup
                        orientation="horizontal"
                        endPoint="filters"
                        type={filter.type}
                        id={filter.id}
                        setId={setId}
                        setPopupShareActive={setPopupShareActive}
                        setLoading={setLoading}
                        name={filter.filterName}
                        setName={setNameFilter}
                        selectedOption={filter.mode}
                        setSelectedOption={setSelectedMailOption}

                    />
                    {filter.mode === "manual" ?
                        <Button
                            sx={{border: "1px solid rgba(25, 118, 210, 0.5)"}}
                            onClick={() => {
                                getEmails(filter.id, setLoading)
                            }}
                        >
                            Получить
                        </Button> : null}

                </div>
            </div>
        </AccordionDetails>
    );
}

function ModeFilter(mode) {
    const style = {color: "#366ac3"}
    const manual = <ScheduleSendIcon sx={style}/>
    const noReply = <CancelScheduleSendIcon sx={style}/>
    const auto = <SendIcon sx={style}/>
    if (mode === "auto") return auto
    else if (mode === "manual") return manual
    else return noReply

}

function getType(type) {
    if (type === "list") return "из списка"
    else if (type === "expression") return "выражение"
    else return ""
}

async function getEmails(id, setLoading) {
    setLoading(true)
    const data = {
        "idFilter": id
    }
    await axios.post("http://localhost:8080/filters/getEmails", data)
    setLoading(false)
}

export default FilterAccordionItem;