const Error = ({ error }) => {
  return (
    <div className='mt-24 md:mt-0 md:p-40'>
      <p className='text-7xl font-semibold text-gray-500 mb-4'>{error?.status}</p>
      <p className='text-5xl font-semibold text-red-500 capitalize mb-4'>{error?.message}</p>
      <p className='mb-4 text-2xl text-gray-600'>Oops, something went wrong.</p>
      <p className='text-2xl text-gray-600'>Try to refresh this page or feel free to contact us if the problem persists</p>
    </div>
  )
}

export default Error
