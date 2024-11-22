

interface PROPS {
    status: boolean,
    leftTitle?: string
    rightTitle?: string,
    onChange: (e:boolean) => void
}
export default function SwitchButton({ status = true, leftTitle, rightTitle, onChange }: PROPS) {
    return <label className="flex items-center cursor-pointer space-x-6">
        {leftTitle && <span className="md:text-lg font-medium text-gray-700 font-medium">
            {leftTitle}
        </span>}
        <input
            type="checkbox"
            defaultValue=""
            className="sr-only peer"
            defaultChecked={status}
            onChange={(e)=>onChange(e.target.checked)}
        />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer  peer-checked:after:translate-x-full  peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-blue-600 after:border-blue-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-gray-200" />
        {rightTitle && <span className="md:text-lg font-medium text-gray-700 font-medium">
            {rightTitle}
        </span>}
    </label>
}