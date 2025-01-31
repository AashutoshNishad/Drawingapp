import React from 'react';

export default function ShapeOption({ mode, setMode }) {
    const shapes = [
        {
            name: "pen",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-fill"
                    viewBox="0 0 16 16"
                >
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                </svg>
            ),
        },
        {
            name: "rectangle",
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-square" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            </svg>)
        },
        {
            name: "circle",
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            </svg>)
        },
        ,
        {
            name: "staightLine",
            icon: (<span style={{color: "white"}}>
                I
            </span>)
        }
        // You can add more shapes here
    ];

    return (
        <div style={{ border: "white solid 1px", padding: '10px', borderRadius: '4px', backgroundColor: '#2a2c2d', display: "flex" }}>
            {shapes.map((item, index) => (
                <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    margin: '10px 0px',
                    color: 'white',
                    flexDirection: 'column',
                    backgroundColor: mode === item.name ? "red" : "",
                }}

                    onClick={() => {
                        setMode(item.name)
                    }}
                >
                    <div style={{ marginRight: '8px', }}>
                        {item.icon}
                    </div>
                </div>
            ))}
        </div>
    );
}
