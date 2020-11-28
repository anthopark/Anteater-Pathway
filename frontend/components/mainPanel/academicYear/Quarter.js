import { useState } from 'react';

import { 
    QuarterContainer,
    QuarterHeader,
    QuarterCourses,
    QuarterFooter,
    TotalUnitBox,
 } from './styled';

const Quarter = ({heading}) => {

    const [totalUnit, setTotalUnit] = useState(0);

    return ( 
        <QuarterContainer>
            <QuarterHeader>
                {heading}
            </QuarterHeader>
            <QuarterCourses>

            </QuarterCourses>
            <QuarterFooter>
                <TotalUnitBox>
                    Unit: {totalUnit}
                </TotalUnitBox>
            </QuarterFooter>
        </QuarterContainer>
     );
}
 
export default Quarter;