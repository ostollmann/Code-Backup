using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace Cosmo2EO_Value_Updater_2.Exceptions
{
    class InvalidDataException : Exception, ISerializable
    {
        public InvalidDataException()
            : base()
        { }

        public InvalidDataException(string message)
            : base(message)
        { }

        public InvalidDataException(string message, Exception inner)
            : base(message, inner)
        { }

        protected InvalidDataException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        { }
    }
}