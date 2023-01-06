import {
	ChevronDoubleLeftIcon,
	ChevronDoubleRightIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "@heroicons/react/20/solid";

import { Button, PageButton } from './components';
import Select from '../Select'

function Pagination({
	canNextPage,
	canPreviousPage,
	gotoPage,
	nextPage,
	pageCount,
	pageIndex,
	pageLength,
	pageSize,
	previousPage,
	setPageSize,
}) {
	return (
		<div className="my-2 py-3 flex items-center justify-between">
			<div className="flex-1 flex justify-between sm:hidden">
				<Button onClick={() => previousPage()} disabled={!canPreviousPage}>
					Previous
				</Button>
				<Button onClick={() => nextPage()} disabled={!canNextPage}>
					Next
				</Button>
			</div>
			<div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
				<div className="flex gap-x-2 items-center">
					<p className="text-sm text-gray-700 tracking-wider w-full">
						Page <span className="font-medium">{pageIndex + 1}</span> of{" "}
						<span className="font-medium">{pageLength}</span>
					</p>
					<div className="mx-2">
						<Select 
							color="yellow"
							label="Page Size"
							onChange={(value) => setPageSize(Number(value))}
							options={[5, 10, 20].map(pageSize => ({
								title: `Show ${pageSize}`, value: String(pageSize)
							}))}
							size="md"
							value={pageSize ? String(pageSize) : ""}
						/>
					</div>
				</div>
				<div>
					<nav
						className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
						aria-label="Pagination"
					>
						<PageButton
							className="rounded-l-md"
							onClick={() => gotoPage(0)}
							disabled={!canPreviousPage}
						>
							<span className="sr-only">First</span>
							<ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
						</PageButton>
						<PageButton
							onClick={() => previousPage()}
							disabled={!canPreviousPage}
						>
							<span className="sr-only">Previous</span>
							<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
						</PageButton>
						<PageButton onClick={() => nextPage()} disabled={!canNextPage}>
							<span className="sr-only">Next</span>
							<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
						</PageButton>
						<PageButton
							className="rounded-r-md"
							onClick={() => gotoPage(pageCount - 1)}
							disabled={!canNextPage}
						>
							<span className="sr-only">Last</span>
							<ChevronDoubleRightIcon
								className="h-5 w-5"
								aria-hidden="true"
							/>
						</PageButton>
					</nav>
				</div>
			</div>
		</div>
	)
}

export default Pagination