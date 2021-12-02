import * as axios from 'axios';

interface AvroSchema {
  Name: string
  Topic: string
  Fields: { [key: string]: string }
}

const testSchema: AvroSchema = {
  Name: 'Test',
  Topic: 'test-topic',
  Fields: {
    id: 'string',
  },
};

async function upsertSchema(schema: AvroSchema): Promise<boolean> {
  const payload = Object.keys(schema.Fields).map((key) => ({ name: key, type: schema.Fields[key] }));
  const requestConfig: axios.AxiosRequestConfig = {
    headers: { 'Content-Type': 'application/vnd.schemaregistry.v1+json' },
    data: payload,
  };
  const result = await axios.default.post('http://kafka-01:8081/subjects/ac-user-event-value/versions', requestConfig);
  return true;
}

export function main() {
  upsertSchema(testSchema);
}
