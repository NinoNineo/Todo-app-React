import { useState, useEffect } from "react";
import "./Home.css"
const Home = () => {
    const [mode, setmode] = useState('light');
    const [newtask, createNewtask] = useState("");
    const [tasks, settask] = useState([]);
    const leftCount = tasks.filter(task => !task.completed).length;
    const changeMode = () => {
        const newmode = mode === 'light' ? 'dark' : 'light';
        setmode(newmode);
        document.documentElement.style.setProperty(
            '--background-image',
            newmode === 'light' ? `var(--background-image-light)` : `var(--background-image-dark)`
        );
        document.documentElement.style.setProperty(
            '--background-small-image',
            newmode === 'light' ? `var(--background-small-image-light)` : `var(--background-small-image-dark)`
        );
        document.documentElement.style.setProperty(
            '--background-color',
            newmode === 'light' ? 'var(--background-color-light)' : 'var(--background-color-dark)'
        );
    };
    function onSubmit(e) {
        e.preventDefault()
        settask(currenttask => {
            return [...currenttask, { id: crypto.randomUUID(), title: newtask, completed: false }]
        })
        e.target.reset();
        createNewtask("");
    }
    function toggletask(id, completed) {
        settask(currenttask => {
            return currenttask.map(task => {
                if (task.id === id) {
                    return { ...task, completed }
                }
                return task
            }
            )
        })
    }
    function deletetask(id) {
        settask(currenttask => {
            return currenttask.filter(task => task.id !== id)
        })
    }
    function clearCompletedtasks() {
        settask(currenttask => {
            return currenttask.filter(task => !task.completed);
        })
    }
    return (
        <>
            <section className="main" data-mode={mode}>
                <div className="m-head">
                    <h1>TODO</h1>
                    <div className={`mode-switch ${mode === 'light' ? 'moon' : 'sun'}`} onClick={changeMode}>
                    </div>
                </div>
                <section className="task-about">
                    <form className="task-container" onSubmit={onSubmit}
                        value={newtask}
                        onChange={e => createNewtask(e.target.value)}>
                        <div className="input-container">
                            <button className="createBtn"></button>
                            <input type="text" name="task-input" id="task-input" placeholder="Create a new task…" />
                        </div>
                    </form>
                    <ul className="task-section">
                        {tasks.map((task) => (
                            <li key={task.id} className="task">
                                <input type="checkbox" checked={task.completed} onChange={e => toggletask(task.id, e.target.checked)} />
                                {task.title}
                                <button onClick={() => deletetask(task.id)} className="delete"></button>
                            </li>
                        ))}
                    </ul>
                    <div className="filter-container">
                        <div className="filter">
                            <p>{leftCount} items left</p>
                            <div className="buttons display-none">
                                <button>All</button>
                                <button>Active</button>
                                <button>Completed</button>
                            </div>
                            <button onClick={clearCompletedtasks} className="clear">Clear Completed</button>
                        </div>
                        <div className="buttons display">
                            <button>All</button>
                            <button>Active</button>
                            <button>Completed</button>
                        </div>
                    </div>
                </section>
            </section>
        </>
    )
}
export default Home