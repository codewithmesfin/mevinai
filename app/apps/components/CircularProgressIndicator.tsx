
interface PROPS {
    title: string,
    progress: number,
}


export default function CircularProgressIndicator({ title, progress }: PROPS) {
    return <div>
        <p className="text-green-600 text-sm text-center font-medium">{title} ... </p>
        <div className="flex justify-between items-center space-x-3">
            <div className="w-full bg-gray-200 rounded-full">
                <div
                    className={`flex justify-center bg-green-600  text-xs font-medium text-blue-100 p-0.5 leading-none rounded-full`}
                    style={{ width: `${progress + 1}%` }}
                >
                </div>
            </div>
            <p className="w-16 text-sm text-gray-900">{progress + 1} %</p>
        </div>
    </div>
}