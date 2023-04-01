import React from 'react'

type Props = {}

const Loading = (props: Props) => {
    return (

        <div style={{ display: "flex" }} >
            <span
                style={{
                    backgroundColor: "#BEE3F8",
                    marginLeft: 15,
                    marginRight: 'auto',
                    marginTop: '8px',
                    borderRadius: "20px",
                    padding: "5px 15px",
                    width: "50%",
                }}
            >
                <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-slate-50 rounded"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-slate-50 rounded col-span-2"></div>
                                <div className="h-2 bg-slate-50 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-slate-50 rounded"></div>
                        </div>
                    </div>
                </div>
            </span>
        </div>

    )
}

export default Loading