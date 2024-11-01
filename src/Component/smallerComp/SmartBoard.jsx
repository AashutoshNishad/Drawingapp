import React, { useEffect, useRef, useState } from 'react'
import "./smartBoard.css"
import Page from '../build/page';
import Pen from '../Sapes.js/pen';
import StaraightLine from '../Sapes.js/StaraitLine';
import Circle from '../Sapes.js/Circle';
import rectangle from '../Sapes.js/rectangle';
import Text from '../Sapes.js/Text';
import ImageElement from '../Sapes.js/Image';
export default function SmartBoard({ mode, setmode, buttonOption }) {

    const board = useRef(null);
    const lineStart = useRef({ x: 0, y: 0 })
    var isDrawable = useRef(false);
    const WorkBook = [];
    const currentPage = useRef(new Page())
    var selectedEntity = useRef([])
    var isDragabel = useRef(false)
    const [typeofscale, settypeofscale] = useState("no-scale")
    const typeOfScale = useRef("no-scale");
    var temphistory = useRef([]);

    useEffect(() => {
        const smartBoard = board.current;
        const context = smartBoard.getContext('2d');
        smartBoard.width = 1000;
        smartBoard.height = 1000;
        smartBoard.style.height = "1000px"
        smartBoard.style.width = "1000px"
        const startDrawing = (e) => {
            isDrawable.current = true;
            lineStart.current = { x: e.offsetX, y: e.offsetY };

            switch (mode.mode) {
                case "pen":
                    currentPage.current.addElement(new Pen(e.offsetX, e.offsetY, mode?.propertice?.color || "black", mode?.propertice?.lineWidth || 3, mode?.propertice?.lineDahsed ? "dashed" : "normal"))
                    break;
                case "shape":
                    {
                        // console.log("under the shape", mode);

                        switch (mode.data.value) {
                            case "line":
                                currentPage.current.addElement(new StaraightLine(e.offsetX, e.offsetY, mode?.propertice?.color || "black", mode?.propertice?.lineWidth || 3, mode?.propertice?.lineDahsed ? "dashed" : "normal"))
                                break;
                            case "circle":
                                currentPage.current.addElement(new Circle(e.offsetX, e.offsetY, mode?.propertice?.color || "black", mode?.propertice?.lineWidth || 3, mode?.propertice?.lineDahsed ? "dashed" : "normal"))
                                break;
                            case "rectangle":
                                currentPage.current.addElement(new rectangle(e.offsetX, e.offsetY, mode?.propertice?.color || "black", mode?.propertice?.lineWidth || 3, mode?.propertice?.lineDahsed ? "dashed" : "normal"))
                                break;

                            default:
                                isDrawable.current = false;

                                break;
                        }
                    }
                    break;
                case "Text-select":
                    currentPage.current.addElement(new Text(mode.text, e.offsetX, e.offsetY, mode?.propertice?.color || "black", mode?.propertice?.lineWidth || 3, mode?.propertice?.lineDahsed ? "dashed" : "normal"))
                    break;
                case "select_pointer":
                    isDrawable.current = false;
                    if (typeOfScale.current === "no-scale")
                        selectedEntity.current = currentPage.current.searchElementByPoint(e.offsetX, e.offsetY);
                    // console.log(selectedEntity.current);
                    isDragabel.current = true;
                    break;
                case "eraser":
                    isDragabel.current = true;
                    break;
                case "image":
                    currentPage.current.addElement(new ImageElement(e.offsetX, e.offsetY, mode?.image))
                    //    isDrawable.current = false;
                    break;
                default:
                    isDrawable.current = false;
                    break;
            }
        };
        var checkPointintherect = (x, y, a, b, c, d) => {
            return a + b <= x + y && c + d >= x + y;
        }

        var inrange = (a, x, y) => {

            return a <= Math.max(x, y) && a >= Math.min(x, y);

        }
        const draw = (e) => {


            if (!isDragabel.current)
                board.current.style.cursor = ""

            if (mode.mode === "eraser" && isDrawable.current) {

                var entity = currentPage.current.searchElementByPoint(e.offsetX, e.offsetY);
                // console.log(entity);
                if (entity.length > 0) {
                    currentPage.current.removeEntity(entity[entity.length - 1]);
                    currentPage.current.drawPage(context);
                }
                return;
            }




            // Select Pointer 

            if (mode.mode === "select_pointer") {
                if (!isDragabel.current) {
                    selectedEntity.current?.forEach(item => {
                        var a = e.offsetX, b = e.offsetY, { x, y } = item.minumumPoint
                        var x2 = item.maxPoint.x
                        var y2 = item.maxPoint.y
                        if (inrange(a, x2 - 2, x2 + 2) && inrange(b, y2 - 2, y2 + 2)) {
                            board.current.style.cursor = "se-resize"
                            typeOfScale.current = "se"
                            return;
                        } else {
                            typeOfScale.current = "no-scale"
                        }
                    })
                }


                // return work only when want to draw or drag
                if (!isDragabel.current) return

                selectedEntity.current?.forEach(item => {
                    var a = e.offsetX, b = e.offsetY, { x, y } = item.minumumPoint
                    var x2 = item.maxPoint.x
                    var y2 = item.maxPoint.y
                    // console.log("mouse Move", e.offsetX);
                    var dragx = x - lineStart.current.x;
                    var dragy = y - lineStart.current.y;

                    // console.log(typeOfScale);
                    if (typeOfScale.current !== "no-scale") {
                        item.scale(e.offsetX, e.offsetY, typeOfScale.current)
                        return;
                    }
                    item.transform(e.offsetX - lineStart.current.x, e.offsetY - lineStart.current.y);
                })
                currentPage.current.drawPage(context)
                lineStart.current = { x: e.offsetX, y: e.offsetY };


                selectedEntity.current.forEach(item => {
                    drawSelectionBox(context, item);
                });
            }

            // Draw dotted rectangle around each selected item


            if (!isDrawable.current) return;



            //         context.setLineDash(isDashedLine ? [5, 5] : []);
            context.beginPath();
            context.moveTo(lineStart.current.x, lineStart.current.y);
            context.lineTo(e.offsetX, e.offsetY);
            context.stroke();


            lineStart.current = { x: e.offsetX, y: e.offsetY };
            currentPage.current.addCurrentPoint(e.offsetX, e.offsetY);
            currentPage.current.drawPage(context);





        };




        checkPointintherect(1, 1, 0, 0, 2, 2)
        // console.log( "check",checkPointintherect(1, 5, 0, 0, 2, 2));

        const stopDraw = () => {
            isDrawable.current = false;

            isDragabel.current = false;

            if (mode.mode === "Text-select") {
                setmode({ mode: "select_pointer", propertice: { ...mode.propertice } })
            }

            typeOfScale.current = "no-scale"
            //         isDragabel.current = false;
            //         // currentPage.current.addhistory()
        };

        //     // Event Listeners
        smartBoard.addEventListener('mousedown', startDrawing);
        smartBoard.addEventListener('mousemove', draw);
        smartBoard.addEventListener('mouseup', stopDraw);
        smartBoard.addEventListener('mouseleave', stopDraw);

        return () => {
            smartBoard.removeEventListener('mousedown', startDrawing);
            smartBoard.removeEventListener('mousemove', draw);
            smartBoard.removeEventListener('mouseup', stopDraw);
            smartBoard.removeEventListener('mouseleave', stopDraw);
        };
    }, [mode, isDrawable]);




    // for undo button

    useEffect(() => {
        if (!buttonOption.pagestate.undo) return
        var d = currentPage.current.undo();
        console.log(d);
        temphistory.current.push(d)
        currentPage.current?.drawPage(board.current.getContext("2d"));
        buttonOption.setpagestate({ ...buttonOption.pagestate, undo: false });
    }, [buttonOption.pagestate.undo])

    useEffect(() => {


        if (!buttonOption.pagestate.redu || temphistory.current.length <= 0) return

        var element = temphistory.current.pop();

        if (!element) return
        console.log("i m doing redu");
        currentPage.current.elements = [...element]
        currentPage.current.history.push(element);
        buttonOption.setpagestate({ ...buttonOption.pagestate, redu: false });
        currentPage.current?.drawPage(board.current.getContext("2d"));

    }, [buttonOption.pagestate.redu])





    // Draws a dotted rectangle around selected items
    const drawSelectionBox = (context, item) => {
        context.save(); // Save the current context state
        context.setLineDash([5, 5]); // Set line to be dashed
        context.strokeStyle = 'rgba(50, 50, 255, 0.6)'; // Light blue color for visibility
        context.lineWidth = 1;

        var { x: minX, y: minY } = item.minumumPoint;
        var { x: maxX, y: maxY } = item.maxPoint;


        const width = maxX - minX;
        const height = maxY - minY;

        context.beginPath();
        context.setLineDash([5, 5])
        context.lineWidth = 2
        context.strokeStyle = "blue"
        context.rect(minX, minY, width, height); // Draw the rectangle around the item
        context.stroke();
        context.closePath();

        context.restore(); // Restore the context state
    };



    useEffect(() => {


        if (mode.mode === "select_pointer") {

            selectedEntity.current.forEach(item => {
                // console.log(item);
                if (!mode.propertice) return

                if (mode.propertice.lineWidth) {
                    item.setLineWIdth(mode.propertice.lineWidth)
                    // setmode({...mode , propertice: {...mode}})
                }
                if (mode.propertice.color)
                    item.setBorderColor(mode.propertice.color)

                // if (mode.propertice.lineDahsed) {
                // console.log(mode.propertice, mode.propertice.lineDahsed ? "dashed" : "normal");
                item.setLineType(mode.propertice?.lineDahsed ? "dashed" : "normal")
                // }

                // setmode({...mode , propertice: undefined})
            })

            // setmode({mode: "select_pointer" , propertice: {...mode.propertice} , })
            // mode.mode = "select_pointer"
        }
        // currentPage.current.drawPage()
    }, [mode.propertice])



    useEffect(() => {
        currentPage.current.drawPage(board.current.getContext("2d"))
        // console.log(mode);
    }, [mode])

    return (
        <div id='smart-board'>
            <canvas id='canvas-board' ref={board} />
        </div>
    )
}
