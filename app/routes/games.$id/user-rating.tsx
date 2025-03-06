import { Minus, Plus, Save } from 'lucide-react';
import { useState } from 'react';
import { Button } from '#/app/components/ui/button';
import { Input } from '#/app/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '#/app/components/ui/select';
import { Separator } from '#/app/components/ui/separator';

export default function GamePlaytime() {
	const [hours, setHours] = useState(0);
	const [platform, setPlatform] = useState('PC');
	const [playHistory, setPlayHistory] = useState([
		{ date: '2023-11-20', hours: 2, platform: 'PC' },
		{ date: '2023-11-18', hours: 3, platform: 'PC' },
		{ date: '2023-11-15', hours: 5, platform: 'PC' },
	]);

	const totalHours = playHistory.reduce((sum, entry) => sum + entry.hours, 0);

	const handleAddHours = () => {
		if (hours <= 0) return;

		const today = new Date().toISOString().split('T')[0];
		setPlayHistory([{ date: today, hours, platform }, ...playHistory]);
		setHours(0);
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col md:flex-row gap-6 items-start">
				<div className="w-full md:w-1/3 bg-card rounded-lg p-6 space-y-4">
					<div className="text-center">
						<h3 className="text-5xl font-bold">{totalHours}</h3>
						<p className="text-sm text-muted-foreground mt-2">
							Total Hours Played
						</p>
					</div>
					<Separator />
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-2">
							<div>
								<label htmlFor="hours" className="text-sm font-medium">
									Hours
								</label>
								<div className="flex mt-1">
									<Button
										variant="outline"
										size="icon"
										onClick={() => setHours(Math.max(0, hours - 1))}
										disabled={hours <= 0}
									>
										<Minus className="h-4 w-4" />
									</Button>
									<Input
										id="hours"
										type="number"
										min="0"
										value={hours}
										onChange={(e) =>
											setHours(
												Math.max(0, Number.parseInt(e.target.value) || 0),
											)
										}
										className="mx-1 text-center"
									/>
									<Button
										variant="outline"
										size="icon"
										onClick={() => setHours(hours + 1)}
									>
										<Plus className="h-4 w-4" />
									</Button>
								</div>
							</div>
							<div>
								<label htmlFor="platform" className="text-sm font-medium">
									Platform
								</label>
								<Select value={platform} onValueChange={setPlatform}>
									<SelectTrigger id="platform" className="mt-1">
										<SelectValue placeholder="Select platform" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="PC">PC</SelectItem>
										<SelectItem value="PS5">PlayStation 5</SelectItem>
										<SelectItem value="XSX">Xbox Series X</SelectItem>
										<SelectItem value="Switch">Nintendo Switch</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
						<Button className="w-full" onClick={handleAddHours}>
							<Save className="mr-2 h-4 w-4" />
							Log Playtime
						</Button>
					</div>
				</div>
				<div className="w-full md:w-2/3 space-y-4">
					<h3 className="text-xl font-bold">Play History</h3>
					<div className="rounded-md border">
						<div className="grid grid-cols-3 p-3 border-b bg-muted/50">
							<div className="font-medium">Date</div>
							<div className="font-medium">Hours</div>
							<div className="font-medium">Platform</div>
						</div>
						<div className="divide-y">
							{playHistory.map((entry, index) => (
								<div key={index} className="grid grid-cols-3 p-3">
									<div>{entry.date}</div>
									<div>{entry.hours}</div>
									<div>{entry.platform}</div>
								</div>
							))}
							{playHistory.length === 0 && (
								<div className="p-3 text-center text-muted-foreground">
									No play history recorded
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
