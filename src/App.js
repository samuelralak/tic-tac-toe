function App() {
    const board = Array.from(Array(3), _ => [...Array(3).fill(false)])

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <div className="flex flex-col mt-8">
                    <table className="table-fixed text-center">
                        <tbody className="divide-y divide-gray-200">
                            {board.map((row, index) => (
                                <tr key={`row-${index}`} className="divide-x divide-gray-200">
                                    {row.map((col, idx) => (
                                        <td key={`col-${index}-${idx}`} className="py-3 cursor-pointer">x</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default App;
