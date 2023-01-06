import { Textarea } from '@material-tailwind/react'
import React from 'react';

function AppTextarea({ error, ...props }) {
	return (
		<React.Fragment>
			<Textarea color="blue" required error={!!error} {...props} />
			{error && (
				<p className="font-semibold italic mt-1 text-red-500 text-xs">
					{error}
				</p>
			)}
		</React.Fragment>
	)
}

export default AppTextarea