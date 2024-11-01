import React from 'react'
import "./Header.css"
export default function Header({ buttonOption }) {
    return (
        <div>
            <div id='document-hedaer'>

                <div id='document-hedaer-left'>
                    <div id='header-logo' className='hoverEffect'>
                        Lets.Draw
                    </div>

                    <div className='vertical-devider' />
                    <div id='header-fileName' className='hoverEffect' >
                        Untitel Document
                    </div>
                    <div>
                        <div id='dot3-icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                            <ul id='dropdown-options'>
                                <li>File</li>
                                <li>Export</li>
                                <li>Import</li>
                                <li>Copy Document</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id='document-hedaer-right'>

                    <div id='video-icon' className='subchild-icon-div'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-video" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z" />
                        </svg>
                    </div>
                    <div onClick={() => {
                        buttonOption.setpagestate({ ...buttonOption.pagestate, undo: !buttonOption.pagestate.undo })
                    }}  className='subchild-icon-div' >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z" />
                            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466" />
                        </svg>
                    </div>
                    <div onClick={() => {
                        buttonOption.setpagestate({ ...buttonOption.pagestate, redu: !buttonOption.pagestate.redu })
                    }}
                    className='subchild-icon-div'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                        </svg>
                    </div>
                    <button id='shere-button'>
                        Shere
                    </button>
                </div>
            </div>
        </div>
    )
}
