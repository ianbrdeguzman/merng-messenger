import { useState } from 'react'

const useSort = () => {
    const [sortedData, setSortedData] = useState(null);

    const sortData = (data) => {
        const sortedData = data.sort((a,b)=> {
                        if (a.latestMessage?.createdAt > b.latestMessage?.createdAt) {
                            return -1;
                        } else if (a.latestMessage?.createdAt < b.latestMessage?.createdAt) {
                            return 1;
                        }
                        return -1;
                    })
        setSortedData(sortedData);
    }

    return [sortedData, sortData]
}

export default useSort
