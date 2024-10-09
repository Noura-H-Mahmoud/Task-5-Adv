import './Pagination.css';
import arrowPre from '../../assets/images/ArrowPreSmall.svg'
import arrowNext from '../../assets/images/ArrowNextSmall.svg'

interface PaginationProps {
    onClickPrev: () => void;
    onClickChange: (page: number) => void;
    onClickNext: () => void;
    Page: number;
    Count: number;
}

export default function Pagination({ onClickPrev, onClickChange, onClickNext, Page, Count }: PaginationProps) {
    const maxVisibleDots = 3;
    const showLastPage = Count > maxVisibleDots;

    const renderDots = () => {
        const dots = [];
        const startPage = Math.max(1, Page - 1);
        const endPage = Math.min(Count, Page + 1);

        for (let i = startPage; i <= endPage; i++) {
            dots.push(
                <div
                    key={i}
                    className={`dot ${Page === i ? 'ActivePagination' : ''}`}
                    onClick={() => onClickChange(i)}
                >
                    {i}
                </div>
            );
        }

        if (endPage < Count) {
            dots.push(
                <div key="dots" className='NM_dots'>
                    <span key="dots">...</span>
                </div>
            );
        }

        if (showLastPage && endPage < Count) {
            dots.push(
                <div
                    key={Count}
                    className={`dot ${Page === Count ? 'ActivePagination' : ''}`}
                    onClick={() => onClickChange(Count)}
                >
                    {Count}
                </div>
            );
        }
        return dots;
    };

    return (
        <div className='NM_pagination'>
            <div onClick={onClickPrev} className='NM_Prev'>
                <img src={arrowPre} alt="Arrow Previous" />
            </div>
            {renderDots()}
            <div onClick={onClickNext} className='NM_Next'>
                <img src={arrowNext} alt="Arrow Next" />
            </div>
        </div>
    );
}