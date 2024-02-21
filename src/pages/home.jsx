import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [showBoardForm, setShowBoardForm] = useState(false);
  const [lists, setLists] = useState([]);
  const [showListForm, setShowListForm] = useState(false);

  const addBoard = (title, image) => {
    const newBoard = { id: Date.now(), title, image, lists: [] };
    setBoards([...boards, newBoard]);
    setShowBoardForm(false);
  };

  const addList = (title) => {
    const newList = { id: Date.now(), title };
    setLists([...lists, newList]);
    setShowListForm(false);
  };

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token") ?? "null");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <section>
        <div className="boards ml-10 mt-10">
          {boards.map((board) => (
              <div key={board.id} className="board " style={{ backgroundImage: `url(${board.image})`, backgroundSize: 'cover' }}>
            <h1 className=" hover:bg-green-200 p-2 duration-500 font-bold rounded-lg text-center border hover:border-green-600">
              {board.title}
            </h1>
              <div className=" flex overflow-auto">
                {lists.map((list) => (
                  <div key={list.id} className="bg-gray-200 hover:bg-gray-600 p-2 duration-500 font-bold rounded-lg ml-3">
                    {list.title}
                  </div>
                ))}
                <button onClick={() => setShowListForm(true)} className=" bg-gray-200 hover:bg-gray-600 p-2 duration-500 font-bold rounded-full">
                  Añadir lista
                </button>
                {showListForm && (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    addList(e.target.elements.listTitle.value);
                  }}>
                    <input name="listTitle" placeholder="Título de la lista" className="bg-gray-200 hover:bg-gray-600 p-2 duration-500 font-bold rounded-full ml-2" required />
                    <button type="submit" className="bg-gray-200 hover:bg-gray-600 ml-2 p-2 duration-500 font-bold rounded-full">Crear</button>
                  </form>
                )}
              </div>
            </div>
          ))}
          <button onClick={() => setShowBoardForm(true)} className="add-board-button mt-10 bg-gray-200 hover:bg-gray-400 p-3 rounded-lg duration-500">
            Crear nuevo tablero
          </button>
          {showBoardForm && (
            <form 
             onSubmit={(e) => {
              e.preventDefault();
              addBoard(e.target.elements.title.value, e.target.elements.imagenes.value);
            }}>
              <input name="title" placeholder="Título del tablero" className="bg-gray-200 hover:bg-gray-400 p-2 mt-5 rounded-lg " required />
              <select className="bg-gray-200 hover:bg-gray-400 p-2 rounded-full ml-5" name="imagenes" required>
                <option className="" value="https://images.unsplash.com/photo-1695718948137-1f4d1d5ba889?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZENN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNzA4MzcwMjM5fA&ixlib=rb-4.0.3&q=80&w=400">Imagen 1</option>
                <hr/>
                <option className="" value="https://images.unsplash.com/photo-1707779734349-ef2bba17dfdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZENN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNzA4MzcwMjM5fA&ixlib=rb-4.0.3&q=80&w=400">Imagen 2</option>
                <hr/>
                <option className="" value="https://images.unsplash.com/photo-1707845679901-16d668568bed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZENN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNzA4MzcwMjM5fA&ixlib=rb-4.0.3&q=80&w=400">Imagen 3</option>
                <hr/>
                <option className="" value="https://images.unsplash.com/photo-1707995354979-59cf51bc619d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZENN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNzA4MzcwMjM5fA&ixlib=rb-4.0.3&q=80&w=400">Imagen 4</option>
              </select>
              <button className="border border-green-800 duration-500 hover:bg-green-400 ml-5 p-2 pl-4 pr-4 mt-5 rounded-full text-black font-medium" type="submit">Crear</button>
            </form>
          )}
        </div>
      </section>        
    </>
  );
}
