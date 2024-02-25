import React, { useState } from 'react';
import styles from '../../css/app.module.scss';
import type { BeatDrawData } from '../../models/visualization/beat-draw-data';
import { getPlatformApiOrThrow } from '@shared/utils/spicetify-utils';
import type { PlayerAPI } from '@shared/platform/player';

type Props = {
    drawData: BeatDrawData;
};

export function VisualizerSlice(props: Readonly<Props>): JSX.Element {
    const [isHovered, setIsHovered] = useState(false);

    // TODO: Set the jukebox's "nextBeat" on click instead of seeking

    return (
        <path
            className={styles['beat-path']}
            fill={
                props.drawData.beat.isPlaying || isHovered
                    ? props.drawData.activeColor
                    : props.drawData.color
            }
            d={props.drawData.drawCommand}
            onMouseOver={() => {
                setIsHovered(true);
            }}
            onMouseOut={() => {
                setIsHovered(false);
            }}
            onClick={async () => {
                await getPlatformApiOrThrow<PlayerAPI>('PlayerAPI').seekTo(
                    props.drawData.beat.start,
                );
            }}
        >
            <title>Beat {props.drawData.beat.index}</title>
        </path>
    );
}
