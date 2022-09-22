import React from 'react';
import cl from './pagination.module.css'
import {getPagesArray} from "../../../utils/pages";

const Pagination = ({totalPages, current, setPage}) => {
    const pages = getPagesArray(totalPages);
    const maxPage = pages[pages.length - 1];

    const prevPage = () => {
        if(current <= 1) return;
        setPage(current - 1);
    }
    const nextPage = () => {
        if(current >= maxPage) return;
        setPage(current + 1);
    }

    return (
        <div className={cl.pagination}>
            <button disabled={current === 1} className={cl.nav} onClick={()=>setPage(1)}>&lt;&lt;</button>
            <button disabled={current === 1} className={cl.nav} onClick={prevPage}>&lt;</button>
            {pages.map(p=>
                <button
                    onClick={() => setPage(p)}
                    key={p}
                    className={current === p ? [cl.item, cl.current].join(' ') : cl.item}
                >
                    {p}
                </button>
            )}
            <button disabled={current === maxPage} className={cl.nav} onClick={nextPage}>&gt;</button>
            <button disabled={current === maxPage} className={cl.nav} onClick={()=>setPage(maxPage)}>&gt;&gt;</button>
        </div>
    );
};

export default Pagination;