import React, { useState } from "react";
import {
  axiosWithAuth,
  API_URL,
} from '../utils';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const save = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    const method = editing ? 'put' : 'post';
    const url = editing ? `${API_URL}/colors/${colorToEdit.id}` : `${API_URL}/colors`;
    
    let data;

    if (editing) {
      data = colorToEdit
    } 
    else {
      const {id, ...rest} = colorToEdit;
      data = rest;
    } 
    axiosWithAuth()[method](url, data)
    .then(res => {
      if (editing) {
        colors = colors.map(color => {
          if (color.id === res.data.id) {
            return res.data;
          }
          return color;
        });
        updateColors(colors);
        setEditing(false);
      } else {
        updateColors(res.data)
      }
      setColorToEdit(initialColor);
    })
    .catch(err => console.error(err));
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete(`${API_URL}/colors/${color.id}`, colorToEdit)
    .then(res => {
      colors = colors.filter(color => color.id !== res.data);
      updateColors(colors);
    })
    .catch(err => console.error(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      <form onSubmit={save}>
          <legend>{editing ? "edit color" : "Add color"}</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button type="reset" onClick={() => {setEditing(false); setColorToEdit(initialColor)}}>cancel</button>
          </div>
        </form>
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
