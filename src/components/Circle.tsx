import React, { useState } from 'react';
import { COLORS } from '@/constants';
import { DefaultizedPieValueType, PieChart } from '@mui/x-charts';
import { Button } from '@mui/material';

const segmentColors = COLORS;

const size = {
    width: 400,
    height: 400,
};

const Arrow = () => (
    <div
        style={{
            position: 'absolute',
            top: '20px',
            zIndex: 99999,
            left: '50%',
            transform: 'translate(-50%, -100%) rotate(180deg)',
            width: 0,
            height: 0,
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderBottom: '20px solid black',
        }}
    />
);

export const Circle = (props: { data: string[] }) => {
    const [rotation, setRotation] = useState(0);
    const [winner, setWinner] = useState<string | null>(null);

    const getArcLabel = (params: DefaultizedPieValueType) => {
        return params.label as string;
    };

    const handleRotate = () => {
        const newRotation = rotation + Math.random() * 360 * 5 + 360;
        setRotation(newRotation);

        // Calculate the winner
        const segmentCount = props.data.length;
        const segmentAngle = 360 / segmentCount;
        const normalizedRotation = newRotation % 360;
        const winningIndex = Math.floor((360 - normalizedRotation) / segmentAngle) % segmentCount;
        setWinner(props.data[winningIndex]);
    };

    return (
        <div className="w-full overflow-hidden my-10">
            <div className="relative">
                <Arrow />
                <div style={{transform: `rotate(${rotation}deg)`, transition: 'transform 0.5s'}}>
                    <PieChart
                        className="m-auto"
                        margin={{right: 5}}
                        series={[{
                            arcLabel: getArcLabel,
                            data: props.data.map((label, i) => ({
                                label,
                                value: 1,
                                color: segmentColors[i],
                            })),
                        }]}
                        slotProps={{
                            legend: {hidden: true},
                            popper: {hidden: true},
                        }}
                        width={size.width}
                        height={size.height}
                    />
                </div>
                <div className="my-5">
                    <Button size="large" fullWidth color="info" variant="contained" onClick={handleRotate}>Rotate</Button>
                </div>
                {winner && <div className="text-center mt-4">Winner: {winner}</div>}
            </div>
        </div>
    );
};