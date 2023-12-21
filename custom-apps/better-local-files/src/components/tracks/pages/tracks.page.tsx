import React from 'react';
import { getTranslation } from 'custom-apps/better-local-files/src/helpers/translations-helper';
import { Folder } from 'lucide-react';
import { Header } from '../../shared/header';
import { TrackList } from '../track-list/track-list';

export function TracksPage(): JSX.Element {
    const tracks = Array.from(window.localTracksService.getTracks().values());

    return (
        <>
            <Header
                image={<Folder fill="var(--spice-text)" size={100}></Folder>}
                title={getTranslation(['local-files'])}
                titleFontSize="6rem"
                additionalText={
                    <>
                        <p>{getTranslation(['local-files.description'])}</p>
                        <p>
                            {getTranslation(
                                [
                                    'tracklist-header.songs-counter',
                                    tracks.length === 1 ? 'one' : 'other',
                                ],
                                tracks.length,
                            )}
                        </p>
                    </>
                }
            />

            <TrackList tracks={tracks} />
        </>
    );
}
