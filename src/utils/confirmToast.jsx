import toast from "react-hot-toast";

export function confirmToast(message) {
    return new Promise((resolve) => {
        toast(
            (t) => (
                <div className="flex flex-col gap-3 min-w-[260px]">
                    <p className="text-sm font-medium text-gray-800">
                        {message}
                    </p>
                    <div className="flex gap-2 justify-end">
                        <button
                            type="button"
                            onClick={() => {
                                toast.dismiss(t.id);
                                resolve(false);
                            }}
                            className="px-3 py-1.5 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                toast.dismiss(t.id);
                                resolve(true);
                            }}
                            className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            ),
            {
                duration: Infinity,
            }
        );
    });
}
