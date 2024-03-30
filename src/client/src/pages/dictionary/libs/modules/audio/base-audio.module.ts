class BaseAudio {
	private audioSrc: string = "";

	public get src() {
		return this.audioSrc;
	}

	public set src(newValue: string) {
		this.audioSrc = newValue;
	}
}

export { BaseAudio };
