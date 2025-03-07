import {
	Check,
	ChevronDown,
	Clock,
	ListChecks,
	Play,
	Trophy,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '#/app/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '#/app/components/ui/dropdown-menu';

type GameStatus = 'Playing' | 'Completed' | 'Backlog' | 'Dropped' | 'Not Set';

export default function GameStatusDropdown() {
	const [status, setStatus] = useState<GameStatus>('Not Set');

	const statusIcons = {
		Playing: <Play className="h-4 w-4 mr-2" />,
		Completed: <Trophy className="h-4 w-4 mr-2" />,
		Backlog: <ListChecks className="h-4 w-4 mr-2" />,
		Dropped: <Check className="h-4 w-4 mr-2" />,
		'Not Set': null,
	};

	const statusColors = {
		Playing: 'bg-green-500/10 text-green-500 border-green-500/20',
		Completed: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
		Backlog: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
		Dropped: 'bg-red-500/10 text-red-500 border-red-500/20',
		'Not Set': '',
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant={status === 'Not Set' ? 'default' : 'outline'}
					className={`shadow-none ${status !== 'Not Set' ? statusColors[status] : ''}`}
				>
					{statusIcons[status]}
					{status === 'Not Set' ? 'Set Status' : status}
					<ChevronDown className="h-4 w-4 ml-2" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="w-[200px]">
				<DropdownMenuItem
					onClick={() => setStatus('Playing')}
					className="cursor-pointer"
				>
					<Play className="h-4 w-4 mr-2" />
					<span>Playing</span>
					{status === 'Playing' && <Check className="h-4 w-4 ml-auto" />}
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => setStatus('Completed')}
					className="cursor-pointer"
				>
					<Trophy className="h-4 w-4 mr-2" />
					<span>Completed</span>
					{status === 'Completed' && <Check className="h-4 w-4 ml-auto" />}
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => setStatus('Backlog')}
					className="cursor-pointer"
				>
					<ListChecks className="h-4 w-4 mr-2" />
					<span>Backlog</span>
					{status === 'Backlog' && <Check className="h-4 w-4 ml-auto" />}
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => setStatus('Dropped')}
					className="cursor-pointer"
				>
					<Check className="h-4 w-4 mr-2" />
					<span>Dropped</span>
					{status === 'Dropped' && <Check className="h-4 w-4 ml-auto" />}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
