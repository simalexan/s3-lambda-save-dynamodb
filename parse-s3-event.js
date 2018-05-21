module.exports = (event) => {
	if (!event || !event.Records || !Array.isArray(event.Records)) {
		return [];
  }
  let extractMessage = record => record.s3 && record.s3.object;
	return event.Records.map(extractMessage).filter(object => object);
};
