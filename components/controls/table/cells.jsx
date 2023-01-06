export function AvatarIdCell({ column, row, value }) {
	return (
		<div className="flex items-center">
			<div className="flex-shrink-0 h-10 w-10">
				{row.original[column.imageAccessor] ? (
					<img
						className="h-10 w-10 rounded-full"
						src={row.original[column.imageAccessor]}
						alt=""
					/>
				) : (
					<span
						className="bg-gray-200 flex items-center justify-center font-bold h-[3rem] min-w-[3rem] rounded-full mr-1 text-gray-700 text-xl uppercase"
					>
						{value[0].toUpperCase()}
					</span>
				)}
			</div>
			<div className="ml-5">
				<div className="text-sm font-medium text-gray-800">{value}</div>
				<div className="uppercase font-bold text-sm text-gray-700">
					{row.original[column.idAccessor]}
				</div>
			</div>
		</div>
	)
}

export function EmailCell({ column, row, value }) {
	return (
		<div>
			<div className="text-sm font-medium text-gray-900">{value}</div>
			<div className="normal-case font-normal text-sm text-gray-500">
				{row.original[column.emailAccessor]}
			</div>
		</div>
	)
}