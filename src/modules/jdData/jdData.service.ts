import { createInternalError } from '../../shared/utils/error.factory.utils';
import jdDataModel from './jdData.model';
import { IJd } from './jdData.types';

export default class JdData {
  static async saveJdData(data: Partial<IJd>): Promise<IJd> {
    if (!data) throw createInternalError('Jd Data was not found in saveJdData');

    let jdDataRecord = new jdDataModel(data);
    jdDataRecord = await jdDataRecord.save();

    return jdDataRecord;
  }
}
