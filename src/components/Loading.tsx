import { GridLoader } from 'react-spinners'

const Loading = () => {
  return (
      <div className="flex justify-center items-center min-h-screen">
          <GridLoader speedMultiplier={0.8} color="#005EEB" />
      </div>
  )
}

export default Loading