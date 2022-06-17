import "./styles.css";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const item = [
  { id: "0", name: "item-1" },
  { id: "1", name: "item-2" },
  { id: "2", name: "item-3" },
  { id: "3", name: "item-4" }
];
export default function App() {
  const [items, setItems] = useState(item);

  function reorder(olditem, from, to) {
    // console.log(olditem);
    const data = [...olditem];
    const [removed] = data.splice(from, 1);
    // console.log(removed);
    data.splice(to, 0, removed);
    return data;
  }

  function onDragEnd(result) {
    // console.log(result);
    if (!result.destination) {
      return;
    } else {
      const newitem = reorder(
        items,
        result.source.index,
        result.destination.index
      );
      setItems(newitem);
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div className="App" ref={provided.innerRef}>
            {items.map((data, i) => (
              <Draggable draggableId={data.id} key={data.id} index={i}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {data.name}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
