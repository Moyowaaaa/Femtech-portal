import { Input } from '@material-tailwind/react'
import React from 'react';

function AppInput({ error, ...props}) {
	return (
		<React.Fragment>
			<Input color="primary" required error={!!error} {...props} />
			{error && (
				<p className="font-secondary font-semibold italic mt-1 text-red-500 text-xs">
					{error}
				</p>
			)}
		</React.Fragment>
	)
}

export default AppInput