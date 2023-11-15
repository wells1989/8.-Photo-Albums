import classNames from 'classnames';

function Skeleton({ times, className }) {

    const outerClassNames = classNames(
        'relative', 
        'overflow-hidden', 
        'bg-gray-200', 
        'rounded', 
        'mb-2.5',
        className // goal to set the height and width of the boxes
    );
    const innerClassNames = classNames(
        'animate-shimmer',
        'absolute',
        'inset-0',
        '-translate-x-full', 
        'bg-gradient-to-r', 
        'from-gray-200', 
        'via-white', 
        'to-gray-200'
    );

    const boxes = Array(times).fill(0).map((_, i) => {
        return <div key={i} className={outerClassNames}>
            <div className={innerClassNames} />
        </div>
    });

    return boxes;
}
// creates a new array with length times, then iterating over it and for each element creating new div element, then returning the array
 
export default Skeleton;

