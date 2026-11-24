import { TrailingSlashUrlSerializer } from './trailing-slash-url-serializer';

describe('TrailingSlashUrlSerializer', () => {
  const serializer = new TrailingSlashUrlSerializer();
  const roundTrip = (url: string) => serializer.serialize(serializer.parse(url));

  it('adds a trailing slash before query and fragment', () => {
    expect(roundTrip('/es')).toBe('/es/');
    expect(roundTrip('/es#about')).toBe('/es/#about');
    expect(roundTrip('/en?x=1#skills')).toBe('/en/?x=1#skills');
  });

  it('keeps the root and already-slashed URLs intact', () => {
    expect(roundTrip('/')).toBe('/');
    expect(roundTrip('/es/')).toBe('/es/');
  });
});
