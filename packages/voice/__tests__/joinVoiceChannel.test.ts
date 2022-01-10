/* eslint-disable @typescript-eslint/no-unsafe-return */
import { joinVoiceChannel } from '../src/joinVoiceChannel';
import * as VoiceConnection from '../src/VoiceConnection';

const adapterCreator = () => ({ destroy: jest.fn(), send: jest.fn() } as any);
const createVoiceConnection = jest.spyOn(VoiceConnection, 'createVoiceConnection');

beforeAll(() => {
	createVoiceConnection.mockImplementation(() => null as any);
});

beforeEach(() => {
	createVoiceConnection.mockClear();
});

describe('joinVoiceChannel', () => {
	test('Uses default group', () => {
		joinVoiceChannel({
			channelId: '123',
			guildId: '456',
			adapterCreator,
		});
		expect(createVoiceConnection.mock.calls[0][0]).toMatchObject({
			channelId: '123',
			guildId: '456',
			group: 'default',
		});
	});

	test('Respects custom group', () => {
		joinVoiceChannel({
			channelId: '123',
			guildId: '456',
			group: 'abc',
			adapterCreator,
		});
		expect(createVoiceConnection.mock.calls[0][0]).toMatchObject({
			channelId: '123',
			guildId: '456',
			group: 'abc',
		});
	});
});
