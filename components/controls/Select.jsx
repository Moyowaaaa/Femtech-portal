import { Option, Select } from '@material-tailwind/react'
import React from 'react'

function AppSelect({ error, options, ...props }) {
	return (
    <React.Fragment>
	    <Select color="primary" required error={!!error} {...props}>
	    	{options.map(({ title, value }, index) => (
	      	<Option key={index} value={value}>{title}</Option>
	    	))}
	    </Select>
			{error && (
				<p className="font-secondary font-semibold italic mt-1 text-red-500 text-xs">
					{error}
				</p>
			)}
		</React.Fragment>
	)
}

export default AppSelect;